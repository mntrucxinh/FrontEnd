'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react'
import { useTheme } from 'next-themes'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  hue: number
  alpha: number
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}
function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v))
}

export default function TetFireworksPopup() {
  const { resolvedTheme } = useTheme()
  const isTet = resolvedTheme === 'tet'

  const [open, setOpen] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const lastSpawnRef = useRef<number>(0)

  useEffect(() => {
    setOpen(isTet)
  }, [isTet])

  useEffect(() => {
    if (!open) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      particlesRef.current = []
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const dpr = clamp(window.devicePixelRatio || 1, 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    // nền đỏ tết
    const baseR = 90,
      baseG = 0,
      baseB = 10

    const fillBackground = (alpha: number) => {
      ctx.fillStyle = `rgba(${baseR},${baseG},${baseB},${alpha})`
      ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    }

    const spawnBurst = (x: number, y: number) => {
      const count = Math.floor(rand(40, 80))
      const hue = Math.random() < 0.7 ? rand(35, 55) : rand(0, 20) // vàng / đỏ
      for (let i = 0; i < count; i++) {
        const angle = rand(0, Math.PI * 2)
        const speed = rand(2, 6)
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: Math.floor(rand(50, 90)),
          size: rand(1.5, 3.5),
          hue,
          alpha: 1,
        })
      }
    }

    // nền ban đầu
    fillBackground(1)

    const tick = (t: number) => {
      // trail
      fillBackground(0.16)

      const spawnEvery = 520
      if (t - lastSpawnRef.current > spawnEvery) {
        lastSpawnRef.current = t
        spawnBurst(rand(80, canvas.clientWidth - 80), rand(80, canvas.clientHeight * 0.5))
      }

      const gravity = 0.035
      const friction = 0.985

      const p = particlesRef.current
      for (let i = p.length - 1; i >= 0; i--) {
        const it = p[i]
        it.life += 1
        it.vx *= friction
        it.vy = it.vy * friction + gravity
        it.x += it.vx
        it.y += it.vy

        const lifeRatio = it.life / it.maxLife
        it.alpha = 1 - lifeRatio

        if (it.life >= it.maxLife || it.alpha <= 0) {
          p.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.fillStyle = `hsla(${it.hue}, 100%, 60%, ${it.alpha})`
        ctx.arc(it.x, it.y, it.size, 0, Math.PI * 2)
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('resize', resize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      particlesRef.current = []
      lastSpawnRef.current = 0
    }
  }, [open])

  if (!open) return null

  return (
    <>
      {/* Canvas: để z thấp + pointer-events-none để không chặn modal */}
      <div className='pointer-events-none fixed inset-0 z-[9000]'>
        <canvas ref={canvasRef} className='absolute inset-0' />
      </div>

      {/* Modal: nâng z cao hơn canvas */}
      <Modal
        isOpen={open}
        onOpenChange={setOpen}
        placement='center'
        backdrop='transparent'
        classNames={{
          wrapper: 'z-[9999]',
          base: 'bg-white/10 backdrop-blur-md border border-white/20 text-white',
          header: 'justify-center',
          body: 'text-center',
          footer: 'justify-center',
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <div className='w-full text-center text-xl font-extrabold md:text-4xl'>
                  Chúc Mừng Năm Mới
                </div>
              </ModalHeader>

              <ModalBody>
                <div className='text-sm text-white/90 md:text-lg'>
                  Năm mới bình an — vạn sự như ý!
                </div>

                <Image
                  src='/assets/images/mualan.gif'
                  alt='Tết'
                  width={200}
                  height={200}
                  className='mx-auto mt-4'
                  priority
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const IMAGES = ["/assets/images/ex1.jpg", "/assets/images/ex2.jpg", "/assets/images/ex3.jpg"]

const sway = (delay = 0) => ({
  initial: { rotate: -2, y: 0 },
  animate: {
    rotate: [-2, 2, -2],
    y: [0, -6, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
  },
})

const floaty = (delay = 0) => ({
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: { duration: 3.6, repeat: Infinity, ease: "easeInOut", delay },
  },
})

export default function ImageInstruction() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((p) => (p + 1) % IMAGES.length), 4000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative w-full py-10 overflow-hidden bg-gradient-to-b from-white to-secondary">
      {/* CONTENT */}
      <div className="container mx-auto px-6 relative">
        <div className="flex justify-center relative">
          {/* LUSH grass behind the image (2 layers) */}
          <div
            className="
              absolute
              left-1/2
              -translate-x-1/2
              bottom-[-40px]
              w-[180%] sm:w-[200%] md:w-[220%]
              h-[170px] sm:h-[200px] md:h-[230px]
              z-0
              pointer-events-none
              select-none
            "
          >
            {/* back layer (far) */}
            <Image
              width={100} height={100}
              src="/assets/images/grass.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-55 blur-[1.5px] scale-105"
            />
            {/* front layer (near) */}
            <Image
              width={100} height={100}
              src="/assets/images/grass.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-95 scale-110"
            />
            {/* fade top edge to blend into background */}
            <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 via-secondary/20 to-transparent" />
          </div>

          {/* image box */}
          <div className="w-full max-w-5xl relative z-10 h-[320px] sm:h-[380px] md:h-[450px] rounded-3xl overflow-hidden bg-white shadow-xl ring-4 ring-emerald-500/70">
            <div className="absolute inset-0 rounded-3xl ring-1 ring-emerald-900/10" />

            <AnimatePresence mode="wait">
              <motion.img
                key={IMAGES[index]}
                src={IMAGES[index]}
                alt={`Slide ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.55 }}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

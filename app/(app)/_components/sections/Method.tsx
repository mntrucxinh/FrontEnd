"use client"

import React from "react"
import { motion } from "framer-motion"
import { METHODS } from "@/constants/methods"

export default function TeachingMethodsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* TOP scallop (full width) */}
      <div className="absolute top-0 left-0 right-0 w-screen h-16 pointer-events-none">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-screen h-full block">
          <path
            d="M0,60 C60,0 120,0 180,60 C240,120 300,120 360,60 C420,0 480,0 540,60 C600,120 660,120 720,60 C780,0 840,0 900,60 C960,120 1020,120 1080,60 C1140,0 1200,0 1260,60 C1320,120 1380,120 1440,60 L1440,0 L0,0 Z"
            fill="#BBF7D0"
            opacity="0.55"
          />
        </svg>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-28">
        {/* Title */}
        <div className="flex items-center justify-center mb-12 relative">
          <h2 className="text-center text-3xl md:text-5xl font-extrabold text-emerald-700">
            Phương pháp dạy học
          </h2>

          {/* dotted swirl (animated draw + drifting dash) */}
          <motion.svg
            className="absolute right-0 md:right-10 top-1 md:top-0 w-40 md:w-56 h-16 pointer-events-none"
            viewBox="0 0 220 80"
            fill="none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <motion.path
              d="M10 55 C45 10, 100 10, 110 35 C120 62, 80 62, 80 42 C80 20, 150 20, 205 10"
              stroke="#16A34A"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="6 12"
              opacity="0.6"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />
            {/* dash drift */}
            <motion.path
              d="M10 55 C45 10, 100 10, 110 35 C120 62, 80 62, 80 42 C80 20, 150 20, 205 10"
              stroke="#16A34A"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="6 12"
              opacity="0.25"
              animate={{ strokeDashoffset: [0, -120] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          </motion.svg>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 place-items-center">
          {METHODS.map((m, i) => (
            <motion.div
              key={m.name}
              className="w-full flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.05 }}
            >
              <motion.div
                className="w-[240px] rounded-[28px] bg-white border border-emerald-200 shadow-xl px-6 pt-6 pb-5"
                style={{ boxShadow: "0 14px 35px rgba(0,0,0,0.12)" }}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3.4 + i * 0.25,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.03, rotate: i % 2 === 0 ? -0.5 : 0.5 }}
              >
                {/* illustration */}
                <div
                  className="mx-auto w-[210px] h-[140px] rounded-2xl overflow-hidden bg-emerald-50 shadow-md ring-2"
                  style={{ borderColor: m.accent }}
                >
                  <img src={m.img} alt={m.name} className="w-full h-full object-contain p-2" />
                </div>

                {/* name */}
                <div className="mt-4 text-2xl font-extrabold text-emerald-700">{m.name}</div>

                {/* quote */}
                <p className="mt-2 text-gray-700 leading-snug whitespace-pre-line">{m.quote}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* BOTTOM WAVES (FULL WEB + ANIM) */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 w-screen">
        {/* Back wave (light green) - subtle horizontal drift */}
        <motion.svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="block w-screen h-16 sm:h-20"
          initial={{ x: 0 }}
          animate={{ x: [0, -22, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M0,60 C80,20 160,20 240,60 C320,100 400,100 480,60 C560,20 640,20 720,60 C800,100 880,100 960,60 C1040,20 1120,20 1200,60 C1280,100 1360,100 1440,60 L1440,120 L0,120 Z"
            fill="#A7F3D0"
            opacity="0.9"
          />
        </motion.svg>

        {/* Front wave (dark green) - opposite drift */}
        <motion.svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="block w-screen h-16 sm:h-20 -mt-10"
          initial={{ x: 0 }}
          animate={{ x: [0, 18, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M0,70 C90,30 180,30 270,70 C360,110 450,110 540,70 C630,30 720,30 810,70 C900,110 990,110 1080,70 C1170,30 1260,30 1350,70 C1400,92 1420,98 1440,100 L1440,120 L0,120 Z"
            fill="#16A34A"
          />
        </motion.svg>
      </div>
    </section>
  )
}

'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function HowItWorks() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative py-24 bg-white overflow-visible"
    >
      {/* Heading */}
      <div className="text-center mb-16 px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-primary">
          HÀNH TRÌNH TRÚC XINH
        </h2>
        <p className="text-gray-700 mt-2 uppercase tracking-wide">
          AN TOÀN – XANH MÁT – CHƠI MÀ HỌC
        </p>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ——— Step 1 ——— */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
            <div className="relative">
              <div className="bg-secondary p-8 rounded-3xl shadow-lg overflow-visible">
                <div className="relative w-full aspect-[3/2] max-w-lg mx-auto md:mx-0 rounded-xl border-4 border-primary bg-gradient-to-br from-primary/10 to-primary/5" />
              </div>
            </div>
            {/* Right: text */}
            <div className="flex flex-col text-left px-4 md:px-0">
              <span className="inline-block w-max px-3 py-1 border-2 border-primary text-primary rounded-full text-sm mb-4">
                Step 1
              </span>
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                Tham quan khu vườn Trúc Xinh
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Ba mẹ ghé thăm khuôn viên xanh mát, tham quan lớp học và khu vui chơi ngoài trời. Con được làm quen cô giáo, trải nghiệm góc học tập và sân cát an toàn.
              </p>
            </div>
          </div>
          {/* Connector ↓ */}
          <div className="hidden md:flex absolute inset-x-0 top-full justify-center mt-6 pointer-events-none" />
        </div>

        {/* ——— Step 2 ——— */}
        <div className="relative mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
            {/* Left: text */}
            <div className="flex flex-col text-left px-4 md:px-0">
              <span className="inline-block w-max px-3 py-1 border-2 border-primary text-primary rounded-full text-sm mb-4">
                Step 2
              </span>
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                Làm quen lớp học & giáo trình
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Cùng con khám phá giáo cụ Montessori, hoạt động STEM, âm nhạc và nghệ thuật. Mỗi tuần, bé có chủ đề thiên nhiên gần gũi để thực hành kỹ năng sống.
              </p>
            </div>
            <div className="relative">
              <div className="bg-secondary p-8 rounded-3xl shadow-lg overflow-visible">
                <div className="relative w-full aspect-[3/2] max-w-lg mx-auto md:mx-0 rounded-xl border-4 border-primary bg-gradient-to-br from-primary/10 to-primary/5" />
              </div>
            </div>
          </div>
          {/* Connector ↓ */}
          <div className="hidden md:flex absolute inset-x-0 top-full justify-center mt-6 pointer-events-none" />
        </div>

        {/* ——— Step 3 ——— */}
        <div className="relative mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
            <div className="relative">
              <div className="bg-secondary p-8 rounded-3xl shadow-lg overflow-visible">
                <div className="relative w-full aspect-[3/2] max-w-lg mx-auto md:mx-0 rounded-xl border-4 border-primary bg-gradient-to-br from-primary/10 to-primary/5" />
              </div>
            </div>
            {/* Right: text + icons */}
            <div className="flex flex-col text-left px-4 md:px-0">
              <span className="inline-block w-max px-3 py-1 border-2 border-primary text-primary rounded-full text-sm mb-4">
                Step 3
              </span>
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                Đồng hành cùng con mỗi ngày
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Nhận báo cáo hằng tuần về tiến bộ của bé, ảnh hoạt động và thực đơn dinh dưỡng cân bằng. Trúc Xinh luôn kết nối phụ huynh qua ứng dụng và các buổi trao đổi trực tiếp.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full bg-primary text-white text-sm shadow-sm">Nhật ký ảnh hằng tuần</span>
                <span className="px-4 py-2 rounded-full bg-white text-primary border border-primary text-sm shadow-sm">Trao đổi phụ huynh - cô</span>
                <span className="px-4 py-2 rounded-full bg-primary/90 text-white text-sm shadow-sm">Thực đơn dinh dưỡng</span>
              </div>
            </div>
          </div>
          {/* (nếu muốn thêm connector cho bước tiếp theo) */}
        </div>

      </div>
    </motion.section>
  )
}

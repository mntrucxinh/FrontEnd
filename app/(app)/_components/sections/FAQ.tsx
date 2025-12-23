'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

const faqs = [
  {
    question: 'Trúc Xinh nhận bé từ mấy tuổi?',
    answer: `Trường đón bé từ 18 tháng đến 6 tuổi với các lớp Nhà chồi, Mầm xanh và Tre non. Sĩ số giới hạn để cô quan sát sát sao từng bé.`
  },
  {
    question: 'Chương trình học gồm những gì?',
    answer: `Bé được học qua chơi với giáo cụ Montessori, hoạt động STEM đơn giản, âm nhạc – nghệ thuật và kỹ năng sống. Mỗi tuần có chủ đề thiên nhiên để bé khám phá.`
  },
  {
    question: 'An toàn và sức khỏe được đảm bảo ra sao?',
    answer: `Khuôn viên khép kín, sàn chống trơn, camera lớp học, góc chơi mềm. Bé được theo dõi sức khỏe, khẩu phần chuẩn dinh dưỡng và kiểm tra định kỳ.`
  },
  {
    question: 'Có buổi tham quan/làm quen miễn phí không?',
    answer: `Có. Phụ huynh đặt lịch để bé tham quan, trải nghiệm lớp trong 1 ngày và nhận tư vấn 1-1 cùng giáo viên chủ nhiệm.`
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const toggle = (i: number) =>
    setOpenIndex(openIndex === i ? null : i)

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative bg-white py-24 overflow-hidden"
    >
      {/* Heading */}
      <div className="text-center mb-12 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-primary">
          NHỮNG ĐIỀU PHỤ HUYNH HAY HỎI
        </h2>
        <p className="text-gray-700 mt-2 uppercase tracking-wide">
          Giải đáp nhanh về lịch học, an toàn và học phí
        </p>
      </div>

      {/* FAQ List */}
      <ul className="max-w-3xl mx-auto space-y-4 px-4 md:px-0">
        {faqs.map((item, i) => (
          <li key={i}>
            {/* Question Header */}
            <button
              onClick={() => toggle(i)}
              className={`
                w-full flex justify-between items-center
                bg-white border rounded-md p-6
                transition-all duration-300
                ${openIndex === i ? 'border-primary' : 'border-gray-200'}
                hover:border-primary/70 hover:shadow-md
                focus:outline-none
              `}
            >
              <span className="text-gray-800 font-medium text-lg md:text-xl">
                {item.question}
              </span>
              <span className="text-3xl text-gray-500">
                {openIndex === i ? '×' : '+'}
              </span>
            </button>

            {/* Answer Panel */}
            {openIndex === i && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-1 bg-secondary border-l-4 border-primary/70 rounded-b-md px-8 py-6"
              >
                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base md:text-lg">
                  {item.answer}
                </p>
              </motion.div>
            )}
          </li>
        ))}
      </ul>
    </motion.section>
  )
}

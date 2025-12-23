"use client"

import { useEffect, useRef } from "react"
import { ReactNode } from "react"

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null)

    // Đóng modal khi click ra ngoài
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300">
            <div
                ref={modalRef}
                className="bg-white p-6 rounded-xl shadow-2xl w-[85%] max-w-2xl relative transform transition-transform duration-300 scale-100"
            >
                <button
                    className="absolute top-3 right-4 text-2xl font-bold text-gray-600 hover:text-gray-900"
                    onClick={onClose}
                >
                    ×
                </button>
                {children}
            </div>
        </div>
    )
}

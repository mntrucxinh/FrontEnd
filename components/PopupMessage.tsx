// components/PopupMessage.tsx
"use client";

import { useEffect } from "react";

interface PopupMessageProps {
    message: string;
    type?: "success" | "error" | "info";
    onClose: () => void;
}

export default function PopupMessage({ message, type = "info", onClose }: PopupMessageProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 4000); // auto close after 4s
        return () => clearTimeout(timer);
    }, [onClose]);

    const bgColor =
        type === "success"
            ? "bg-green-500"
            : type === "error"
                ? "bg-red-500"
                : "bg-blue-500";

    return (
        <div className={`fixed bottom-4 right-4 z-50 px-4 py-3 rounded shadow text-white ${bgColor}`}>
            <p className="text-sm">{message}</p>
        </div>
    );
}

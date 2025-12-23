"use client";

import { useEffect, useState } from "react";
import LoginForm from "@/components/LoginForm";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  if (!mounted) return null; // Ngăn server render trước

  return (
    <main className="fixed inset-0 flex flex-col items-center justify-center bg-primary gap-4">
      <header className="absolute top-0 left-0 w-full px-6 py-4 flex items-center">
                <button
                    onClick={() => router.push("/")}
                    className="flex items-center gap-2"
                >
                    <span className="text-white font-semibold text-lg">Trúc Xinh</span>
                </button>
            </header>
      <LoginForm />

      <p className="text-sm text-white">
        Not registered?{" "}
        <Link href="/register" className="underline text-white hover:text-gray-300">
          Create an account
        </Link>
      </p>
    </main>
  );
}

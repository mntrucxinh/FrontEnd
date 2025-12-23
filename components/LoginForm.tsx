"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation" // nếu dùng App Router
import GoogleLoginButton from "@/components/GoogleLoginButton"
import { useMutationLogin } from "@/hook/auth/use-login"
import { LoginRequest } from "@/types/auth"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { mutate, isPending, isError, error } = useMutationLogin()
  const router = useRouter() // 👉 init router

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const payload: LoginRequest = { email, password }

    mutate(payload, {
      onSuccess: (data) => {
        console.log("✅ Login thành công:", data)
        router.push("/dashboard") // 👉 chuyển trang
      },
      onError: (error) => {
        console.error("❌ Lỗi login:", error.message)
      },
    })
  }

  return (
    <div className="bg-white p-6 rounded-lg w-[90%] max-w-sm shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded px-4 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded px-4 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {isError && (
          <p className="text-sm text-red-500">{error?.message}</p>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        >
          {isPending ? "Logging in..." : "LOGIN"}
        </button>
      </form>

      <div className="text-center my-4 text-sm text-gray-500">or</div>

      <div className="flex justify-center">
        <GoogleLoginButton />
      </div>
    </div>
  )
}

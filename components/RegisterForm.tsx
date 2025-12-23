"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useMutationSignUp } from "@/hook/auth/use-login"
import { useMutationVerifyOtp } from "@/hook/auth/use-login"
import { SignUpRequest, VerifyOtpRequest } from "@/types/auth"
import GoogleLoginButton from "@/components/GoogleLoginButton"

export default function RegisterForm() {
  const router = useRouter()
  const [step, setStep] = useState<"register" | "verify">("register")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [code, setCode] = useState("") // 🔄 đổi từ otp -> code
  const [message, setMessage] = useState("")

  const { mutate: signUp, isPending: signingUp } = useMutationSignUp()
  const { mutate: verifyOtp, isPending: verifying } = useMutationVerifyOtp()

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage("❌ Mật khẩu xác nhận không khớp.")
      return
    }

    const payload: SignUpRequest = { email, password }
    signUp(payload, {
      onSuccess: (res) => {
        setMessage(res.message)
        setStep("verify")
      },
      onError: (err) => {
        setMessage("❌ Đăng ký thất bại: " + err.message)
      },
    })
  }

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    const payload: VerifyOtpRequest = { email, code } // 🔄 dùng code thay vì otp

    verifyOtp(payload, {
      onSuccess: () => {
        setMessage("✅ Xác thực thành công! Đang chuyển hướng...")
        setTimeout(() => {
          router.push("/dashboard")
        }, 1000)
      },
      onError: (err) => {
        setMessage("❌ Xác thực thất bại: " + err.message)
      },
    })
  }

  return (
    <div className="bg-white p-6 rounded-lg w-[90%] max-w-sm shadow-lg space-y-4">
      {step === "register" && (
        <>
          <h2 className="text-2xl font-bold text-center mb-2">Sign Up</h2>
          <form className="space-y-4" onSubmit={handleRegister}>
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
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border rounded px-4 py-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={signingUp}
              className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
            >
              {signingUp ? "Signing up..." : "Sign Up"}
            </button>
          </form>
          <div className="text-center my-2 text-sm text-gray-500">or</div>
          <div className="flex justify-center">
            <GoogleLoginButton />
          </div>
        </>
      )}

      {step === "verify" && (
        <>
          <h2 className="text-2xl font-bold text-center mb-2">Verify OTP</h2>
          <p className="text-center text-sm text-gray-500 mb-2">
            Mã xác thực đã được gửi đến email: <strong>{email}</strong>
          </p>
          <form onSubmit={handleVerify} className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full border rounded px-4 py-2"
              value={code} // 🔄 dùng code thay vì otp
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={verifying}
              className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              {verifying ? "Verifying..." : "Verify"}
            </button>
          </form>
        </>
      )}

      {message && <p className="text-sm text-center text-red-600">{message}</p>}
    </div>
  )
}

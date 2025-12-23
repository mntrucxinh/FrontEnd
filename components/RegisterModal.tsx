"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import GoogleLoginButton from "@/components/GoogleLoginButton"
import { useMutationSignUp } from "@/hook/auth/use-login"
import { useMutationVerifyOtp } from "@/hook/auth/use-login"
import { SignUpRequest, VerifyOtpRequest } from "@/types/auth"

interface Props {
  isOpen: boolean
  onClose: () => void
  onSwitchToLogin?: () => void
}

const SignUpModal: React.FC<Props> = ({ isOpen, onClose, onSwitchToLogin }) => {
  const router = useRouter()
  const [step, setStep] = useState<"register" | "verify">("register")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [code, setCode] = useState("")
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
    const payload: VerifyOtpRequest = { email, code }

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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-white p-6 rounded-lg w-[90%] max-w-sm relative shadow-lg"
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-xl font-bold text-gray-500 hover:text-gray-800"
            >
              ×
            </button>

            {step === "register" && (
              <>
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                </div>

                <form className="space-y-4" onSubmit={handleRegister}>
                  <input
                    type="email"
                    placeholder="Email *"
                    className="w-full border rounded px-4 py-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password *"
                    className="w-full border rounded px-4 py-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password *"
                    className="w-full border rounded px-4 py-2"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    disabled={signingUp}
                    className="w-full py-2 bg-purple-600 text-white rounded font-semibold hover:bg-purple-700 transition"
                  >
                    {signingUp ? "Signing up..." : "SIGN UP"}
                  </button>
                </form>

                <div className="text-center my-4 text-gray-500">or</div>

                <div className="flex justify-center mt-4">
                  <GoogleLoginButton />
                </div>

                <p className="mt-4 text-sm text-center text-gray-600">
                  Already have an account?{" "}
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => {
                      onClose()
                      onSwitchToLogin?.()
                    }}
                  >
                    Log in
                  </button>
                </p>
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
                    value={code}
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

            {message && (
              <p className="text-sm text-center text-red-600 mt-2">{message}</p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SignUpModal

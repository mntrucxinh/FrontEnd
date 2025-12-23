import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import GoogleLoginButton from "@/components/GoogleLoginButton"
import { useMutationLogin } from "@/hook/auth/use-login"
import { LoginRequest } from "@/types/auth"
import { useRouter } from "next/navigation"


interface Props {
  isOpen: boolean
  onClose: () => void
  onSwitchToSignUp?: () => void
}

const LoginModal: React.FC<Props> = ({ isOpen, onClose, onSwitchToSignUp }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { mutate, isPending, isError, error } = useMutationLogin()
  const router = useRouter() // 👉 init router

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const payload: LoginRequest = { email, password }

    mutate(payload, {
      onSuccess: (data: unknown) => {
        console.log("✅ Login thành công:", data)
        onClose()
        router.push("/dashboard") // 👉 chuyển trang
        // Optionally: redirect or fetch user profile
      },
      onError: (error: { message: string }) => {
        console.error("❌ Lỗi login:", error.message)
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

            <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                className="w-full border rounded px-4 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full border rounded px-4 py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {isError && (
                <p className="text-sm text-red-500">{error?.message}</p>
              )}
              <button
                type="submit"
                className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                disabled={isPending}
              >

                {isPending ? "Logging in..." : "LOGIN"}

              </button>
            </form>

            <div className="text-center my-4">or</div>

            <div className="flex justify-center mt-4">
              <GoogleLoginButton />
            </div>

            <p className="mt-4 text-sm text-center text-gray-600">
              Don’t have an account?{" "}
              <button
                className="text-blue-600 hover:underline"
                onClick={() => {
                  onClose()
                  onSwitchToSignUp?.()
                }}
              >
                Sign up
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoginModal

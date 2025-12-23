// src/components/GoogleLoginButton.tsx
"use client"

import { useGoogleLogin } from "@react-oauth/google"
import { Button } from "@/components/ui/button"
import { useMutationLoginWithGoogle } from "@/hook/auth/use-login"
import { GoogleLoginRequest } from "@/types/auth"
import { useRouter } from "next/navigation";


const GoogleLoginButton = () => {
    const router = useRouter();
    const { mutate: loginWithGoogle } = useMutationLoginWithGoogle()

    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            console.log("Google login success:", tokenResponse)
            if (tokenResponse.access_token) {
                const payload: GoogleLoginRequest = {
                    accessToken: tokenResponse.access_token,
                }
                loginWithGoogle(payload, {
                    onSuccess: (data) => {
                        console.log("✅ BE xác thực thành công:", data)
                        router.push("/dashboard")
                    },
                    onError: (err) => {
                        const error: any = err;
                        console.error("❌ Backend xác thực thất bại:", error.response?.data || error.message);
                    },
                })
            } else {
                console.error("❌ Không có access_token từ Google")
            }
        },
        onError: () => {
            console.log("Google login failed")
        },
    })

    return (
        <Button
            onClick={() => login()}
            className="rounded-full bg-white text-black border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2 w-full py-3 font-medium text-sm"
        >
            <span className="text-lg">🔑</span>
            <span>Sign in with Google</span>
        </Button>
    )
}

export default GoogleLoginButton

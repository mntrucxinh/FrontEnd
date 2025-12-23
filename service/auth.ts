import { setAccessToken } from "@/utils/storage"

import {
  GoogleLoginRequest,
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  SignUpResponse,
  UpdateEmailRequest,
  UpdateEmailResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "@/types/auth"
import { api } from "@/lib/axios"

export default {
  // Login Method
  login: async (payload: LoginRequest): Promise<LoginResponse> => {
    const { data } = await api.post("/auth/local/signin", payload)
    const { accessToken } = data
    setAccessToken(accessToken)
    return data
  },

  // Login with Google Method
  loginWithGoogle: async (
    payload: GoogleLoginRequest
  ): Promise<LoginResponse> => {
    const { data } = await api.post("/auth/google/verify", payload)
    return data
  },

  // Logout Method
  logout: async (): Promise<void> => {
    await api.post("/auth/logout")
  },

  // SignUp Method
  signUp: async (payload: SignUpRequest): Promise<SignUpResponse> => {
    const { data } = await api.post("/auth/local/signup", payload)
    return data
  },

  // Verify OTP Method
  verifyOtp: async (payload: VerifyOtpRequest): Promise<VerifyOtpResponse> => {
    const { data } = await api.post("/auth/local/verify", payload)
    return data
  },

  // Update Email Method
  updateEmail: async (
    data: UpdateEmailRequest
  ): Promise<UpdateEmailResponse> => {
    const { data: responseData } = await api.post("/auth/change-email", data)
    return responseData
  },

  // Update Password Method
  updatePassword: async (
    data: UpdatePasswordRequest
  ): Promise<UpdatePasswordResponse> => {
    const { data: responseData } = await api.post("/auth/change-password", data)
    return responseData
  },
}

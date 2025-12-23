import authService from "@/service/auth" // Import toàn bộ service
import { useMutation } from "@tanstack/react-query"
import { useContext } from "react"
import { AuthContext } from "@/components/context/auth-context"
import { LoginRequest, LoginResponse, GoogleLoginRequest, SignUpRequest, SignUpResponse } from "@/types/auth"
import { VerifyOtpRequest, VerifyOtpResponse } from "@/types/auth"
import { UpdateEmailRequest, UpdateEmailResponse } from '@/types/auth'
import { UpdatePasswordRequest, UpdatePasswordResponse } from '@/types/auth'

// Hook cho login
export const useMutationLogin = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: authService.login, // Sử dụng authService.login
  })
}

// Hook cho login with Google
export const useMutationLoginWithGoogle = () => {
  return useMutation<LoginResponse, Error, GoogleLoginRequest>({
    mutationFn: authService.loginWithGoogle, // Sử dụng authService.loginWithGoogle
  })
}

// Hook cho sign up
export const useMutationSignUp = () => {
  return useMutation<SignUpResponse, Error, SignUpRequest>({
    mutationFn: authService.signUp, // Sử dụng authService.signUp
  })
}

// Hook cho verify OTP
export const useMutationVerifyOtp = () => {
  return useMutation<VerifyOtpResponse, Error, VerifyOtpRequest>({
    mutationFn: authService.verifyOtp, // Sử dụng authService.verifyOtp
  })
}

// Hook cho cập nhật email
export function useUpdateEmail() {
  return useMutation<UpdateEmailResponse, Error, UpdateEmailRequest>({
    mutationFn: authService.updateEmail, // Sử dụng authService.updateEmail
  })
}

// Hook cho cập nhật password
export function useUpdatePassword() {
  return useMutation<UpdatePasswordResponse, Error, UpdatePasswordRequest>({
    mutationFn: authService.updatePassword, // Sử dụng authService.updatePassword
  })
}

// Hook cho Auth context
export function useAuth() {
  return useContext(AuthContext)
}

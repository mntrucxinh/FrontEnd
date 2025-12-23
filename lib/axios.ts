import { clearTokens, getAccessToken, setAccessToken } from "@/utils/storage"
import axios from "axios"

let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error)
    else prom.resolve(token)
  })
  failedQueue = []
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
})

// Request Interceptor
api.interceptors.request.use(async (config) => {
  const token = getAccessToken()
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`
  }
  return config
})

// Response Interceptor
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config

    // Nếu token hết hạn và chưa retry thì thực hiện refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`
            return api(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      isRefreshing = true
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {},
          {
            withCredentials: true, // Gửi cookie lên server
          }
        )
        const { accessToken } = res.data
        setAccessToken(accessToken)
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
        processQueue(null, accessToken)

        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`
        return api(originalRequest)
      } catch (err) {
        clearTokens()
        processQueue(err, null)
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

"use client"

import Cookies from "js-cookie"

export const getAccessToken = () => {
  const cookieToken = Cookies.get("accessToken")

  return cookieToken
}

export const setAccessToken = (token: string) => {
  Cookies.set("accessToken", token, { expires: 7 }) // Set cookie to expire in 7 days
}
export const clearTokens = () => {
  localStorage.removeItem("accessToken")
  Cookies.remove("accessToken")
}

import { api } from "@/lib/axios"

const getAuthLinkedAccountYoutube = async () => {
  const data = await api.get("/youtube/auth")
  return data.data
}

export default {
  getAuthLinkedAccountYoutube,
}

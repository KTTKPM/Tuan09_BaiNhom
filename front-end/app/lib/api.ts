import axios from "axios"

let api: ReturnType<typeof axios.create>

try {

  const baseURL = import.meta.env.VITE_API_URL

  if (!baseURL) {
    throw new Error("VITE_API_URL is not defined in environment variables")
  }

  api = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  })
} catch (error) {
  console.error("Failed to create API instance:", error)
  throw error
}

export default api
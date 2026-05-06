import api from "~/lib/api"

export const authApi = {
  login(data: { username: string; password: string }) {
    return api.post("/login", data)
  },
  register(data: { username: string; password: string }) {
    return api.post("/register", data)
  },
}

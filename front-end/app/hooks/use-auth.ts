import { useMutation } from "@tanstack/react-query"

import { authApi } from "~/lib/authApi"

export function useAuth() {
  const login = useMutation({
    mutationFn: authApi.login,
  })

  const register = useMutation({
    mutationFn: authApi.register,
  })

  return { login, register }
}

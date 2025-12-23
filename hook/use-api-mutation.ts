import { useMutation, UseMutationOptions } from "@tanstack/react-query"

import { api } from "@/lib/axios"

type ApiMethod = "post" | "put" | "patch" | "delete"

export function useApiMutation<TData = any, TVariables = any>(
  url: string,
  method: ApiMethod = "post",
  options?: UseMutationOptions<TData, unknown, TVariables>
) {
  return useMutation<TData, unknown, TVariables>({
    mutationFn: async (variables: TVariables) => {
      const res = await api[method]<TData>(url, variables)
      return res.data
    },
    ...options,
  })
}

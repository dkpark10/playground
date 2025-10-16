import { useQueryClient } from "@tanstack/react-query"

export const useQueryReferer = () => {
  const queryClient = useQueryClient();
  return queryClient.getQueryDefaults(['referer']).initialData;
}
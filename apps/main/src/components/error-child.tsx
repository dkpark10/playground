import { useQuery } from "@tanstack/react-query";
import { fetchClient, Error } from "@/utils";

const fetchError = async () => {
  const { data } = await fetchClient.get<{ result: string }>("api/error");
  return data;
};

export default function ErrorChild() {
  const { data } = useQuery(["error"], fetchError, {
    useErrorBoundary: (error: Error) => (error.response?.status as number) >= 400,
  });
  return <div>{data?.result}</div>;
}

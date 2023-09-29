import { nextFetchClient } from "@/utils/next-fetch-client";

export const revalidate = 2;
export const dynamic = "force-dynamic";

const getTodoData = async () => {
  const res = await nextFetchClient.get<number>("/api/random");
  return res;
};

export default async function NextNext() {
  const ran = await getTodoData();
  return <div>{ran}</div>;
}

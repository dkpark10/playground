import { nextFetchClient } from "@/utils/next-fetch-client";
import Image from "next/image";

export const dynamic = "force-dynamic";

const getTodoData = async () => {
  // const res = await nextFetchClient.get<number>("/api/random", {
  //   next: { revalidate: 2 },
  // });
  // return res;

  return Promise.all([
    nextFetchClient.get<number>("/api/random"),
    nextFetchClient.get<number>("/api/random2", {
      next: { revalidate: 2 },
    }),
  ]);
};

export default async function NextNext() {
  const [ran1, ran2] = await getTodoData();
  return (
    <>
      <div>{ran1}</div>
      <div>{ran2}</div>
      <Image width={100} height={100} src="https://shop.zumst.com/upload/best/2023/10/16/SZBC223417.png" alt="test" />
    </>
  );
}

import Link from "next/link";
import { nextFetchClient } from "@/utils/next-fetch-client";

/** @description 캐시 재검증 옵션 ms(x) second(0) */
export const revalidate = 2;

const getRandomData = async () => {
  const res = await nextFetchClient.get<number>("/api/random", {
    /** @description force-cache가 디폴트 옵션이다. */
    // cache: "force-cache",
  });

  return res;
};

export default async function StaticPage() {
  const ran = await getRandomData();
  return (
    <Link href="/">
      <div>{ran}</div>
    </Link>
  );
}

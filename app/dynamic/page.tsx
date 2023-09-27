import Link from "next/link";

const getRandomData = async () => {
  const res = await fetch("http://localhost:3000/api/random", {
    /** @description 캐시 재검증 옵션 ms(x) second(0) */
    next: { revalidate: 2 },

    /** @description force-cache가 디폴트 옵션이다. */
    // cache: "force-cache",
  });

  return res.json() as Promise<number>;
};

export default async function StaticPage() {
  const ran = await getRandomData();
  return (
    <Link href="/">
      <div>{ran}</div>
    </Link>
  );
}

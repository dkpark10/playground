import Link from "next/link";
import type { InferGetServerSidePropsType } from "next";

export const getServerSideProps = () => {
  const value = Math.floor(Math.random() * 100);

  return {
    props: {
      value,
    },
  };
};

export default function PagePage({ value }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main>
      <Link href="/p" prefetch={false}>
        ssg 링크입니다.
      </Link>
      <div>ssg page{value}</div>
    </main>
  );
}

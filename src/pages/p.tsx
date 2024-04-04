import Link from "next/link";
import { QueryClient, useQuery, dehydrate } from "@tanstack/react-query";

const tempFetch = () => {
  const value = Math.floor(Math.random() * 100);
  return Promise.resolve(` random: ${value}`);
};

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["test-query"], tempFetch);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function PagePage() {
  const { data: value } = useQuery(["test-query"], tempFetch);

  return (
    <main>
      <Link href="/ssr" prefetch={false}>
        ssr 링크입니다.
      </Link>

      <div>ssg page{value}</div>
    </main>
  );
}

import Link from "next/link";
import { QueryClient, useQuery, dehydrate } from "@tanstack/react-query";

const tempFetch = () => {
  return Promise.resolve(` random: ${99}`);
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
  console.log(value);

  return (
    <main>
      <div>
        <Link href="/ssr" prefetch={false}>
          ssr 링크입니다.
        </Link>
      </div>

      <div>
        <Link href="/dehydrate" prefetch={false}>
          어디로
        </Link>
      </div>

      <div>ssg page{value}</div>
    </main>
  );
}

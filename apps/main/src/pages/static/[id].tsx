import { InferGetStaticPropsType } from "next";

export function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const ranBaseAt = new Date().toISOString().match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}/)?.[0] || "";
  const result = await fetch(`https://randomuser.me/api?ran=${ranBaseAt}`).then((res) => res.json());

  return {
    props: {
      result,
    },
    revalidate: 10,
  };
}

export default function Page(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return <div>{props.result.results[0].email}</div>;
}

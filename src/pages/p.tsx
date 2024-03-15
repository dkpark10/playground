import type { InferGetStaticPropsType } from "next";

export const getStaticProps = () => {
  const value = Math.floor(Math.random() * 100);

  return {
    props: {
      value,
    },
  };
};

export default function PagePage({ value }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <div>ssg page{value}</div>;
}

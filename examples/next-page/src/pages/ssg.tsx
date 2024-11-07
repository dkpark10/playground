import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export const getStaticProps: GetServerSideProps<{ data: number }> = async () => {
  const data = await Promise.resolve(1);
  console.log('123 se');

  return {
    props: {
      data,
    },
    revalidate: 60 * 60,
  };
};

export default function SsgPage({ data }: InferGetServerSidePropsType<typeof getStaticProps>) {
  console.log('123 cl', data);
  return <div>ssg- {data}</div>;
}

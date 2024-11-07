import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export const getServerSideProps: GetServerSideProps<{ data: number }> = async () => {
  const data = await Promise.resolve(1);
  console.log('123 se');

  return {
    props: {
      data,
    },
  };
};

export default function SsrPage({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log('123 cl', data);
  return <div>ssr- {data}</div>;
}

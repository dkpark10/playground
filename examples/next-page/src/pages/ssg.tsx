import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Stats from '@/components/stats';

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
  return (
    <React.Fragment>
      <div>ssg- {data}</div>
      <Stats
        event={['click']}
        properties={(e: MouseEvent) => ({
          x: e.clientX,
          y: e.clientY,
        })}
      >
        <button type="button" onClick={() => console.log(123)}>
          click
        </button>
      </Stats>
    </React.Fragment>
  );
}

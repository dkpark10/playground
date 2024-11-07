import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Suspense } from 'react';
import { createQueryKeyStore } from '@lukemorales/query-key-factory';

const queryKeys = createQueryKeyStore({
  child: {
    detail: (idx: number) => [idx],
  },
});

const getRandomNumber = (min = 0, max = 3_000) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const fetchFn = async () => {
  const delay = getRandomNumber(100, 1_000);
  const { data } = await axios.get(`api/delay/${delay}`);
  return data;
};

export default function RqPage() {
  // return <DynamicChildRoot />;
  return (
    <>
      <div>
        <Link href="ssg" prefetch={false}>
          ssg page
        </Link>
      </div>
      <div>
        <Link href="ssr" prefetch={false}>
          ssr page
        </Link>
      </div>
    </>
  );
}

const DynamicChildRoot = dynamic(() => Promise.resolve(ChildRoot), {
  ssr: false,
});

function ChildRoot() {
  return (
    <main>
      <Suspense fallback={<div>...child loading</div>}>
        <Child id={1} />
      </Suspense>
      {/* <Suspense fallback={<div>...child loading</div>}>
        <Child id={2} />
      </Suspense>
      <Suspense fallback={<div>...child loading</div>}>
        <Child id={3} />
      </Suspense>
      <Suspense fallback={<div>...child loading</div>}>
        <Child id={4} />
      </Suspense>
      <Suspense fallback={<div>...child loading</div>}>
        <Child id={5} />
      </Suspense>
      <Suspense fallback={<div>...child loading</div>}>
        <Child id={6} />
      </Suspense>
      <Suspense fallback={<div>...child loading</div>}>
        <Child id={7} />
      </Suspense> */}
    </main>
  );
}

const useQueryApiRandom = (id: number) => {
  return useSuspenseQuery({
    queryKey: queryKeys.child.detail(id).queryKey,
    queryFn: () => fetchFn(),
  });
};

const useTempValue = () => {
  const queryClient = useQueryClient();

  return useQuery<number | undefined>({
    queryKey: ['temp'],
    queryFn: () => {
      // const result = queryClient.getQueryData<number>(
      //   queryKeys.child.detail(1).queryKey
      // );
      // return Promise.resolve(result);
      return Promise.resolve(getRandomNumber(100, 1_000));
    },
  });
};

function Child({ id }: { id: number }) {
  const queryClient = useQueryClient();

  const { data } = useQueryApiRandom(id);

  const temp = useTempValue();

  const mutate = useMutation({
    mutationFn: async () => {
      await Promise.reject('reject');
    },

    onMutate: () => {},

    onSettled: (a) => {
      console.log('check success', a);
      queryClient.invalidateQueries({
        queryKey: queryKeys.child.detail(id).queryKey,
      });
      queryClient.invalidateQueries({ queryKey: ['temp'] });
    },

    // onSuccess: () => {
    //   console.log('123 성공');
    //   queryClient.invalidateQueries({
    //     queryKey: queryKeys.child.detail(id).queryKey,
    //   });
    //   queryClient.invalidateQueries({ queryKey: ['temp'] });
    // },

    onError: (a) => {
      console.log('check error', a);
      console.log('rejected value: ' + a);
    },
  });

  return (
    <>
      <Link href='ssr' prefetch={false}>링크</Link>
      <button type="button" onClick={() => mutate.mutate()}>
        mutate click
      </button>
      <button
        type="button"
        onClick={async () => {
          try {
            await mutate.mutateAsync();
          } catch (error) {
            console.log('rejected value: ' + error);
          }
        }}
      >
        mutateAsync click
      </button>
      <div>
        child{id}-{data}
      </div>
      <section>temp: {temp?.data ?? 0}</section>
    </>
  );
}

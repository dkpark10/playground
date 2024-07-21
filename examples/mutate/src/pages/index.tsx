import dynamic from 'next/dynamic';
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import axios from 'axios';
import { Suspense } from 'react';
import { createQueryKeyStore } from '@lukemorales/query-key-factory';

const queryKeys = createQueryKeyStore({
  child: {
    detail: (idx: number) => [idx],
  },
});

const fetchFn = async () => {
  const getRandomNumber = (min = 0, max = 3_000) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const delay = getRandomNumber(100, 1_000);
  const { data } = await axios.get(`api/delay/${delay}`);
  return data;
};

export default function RqPage() {
  return <DynamicChildRoot />;
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
      const result = queryClient.getQueryData<number>(
        queryKeys.child.detail(1).queryKey
      );
      return Promise.resolve(result);
    },
  });
};

function Child({ id }: { id: number }) {
  const queryClient = useQueryClient();

  const { data } = useQueryApiRandom(id);

  const temp = useTempValue();

  const mutate = useMutation({
    mutationFn: async () => {
      return await Promise.reject('reject');
    },

    onMutate: () => {},

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.child.detail(id).queryKey,
      });
      queryClient.invalidateQueries({ queryKey: ['temp'] });
    },

    onError: (value) => {
      console.log('rejected value: ' + value);
    },
  });

  return (
    <>
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
      <section>{temp?.data ?? 0}</section>
    </>
  );
}

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
  temp: null,
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
    </main>
  );
}

const useQueryApiRandom = (id: number) => {
  return useSuspenseQuery({
    queryKey: queryKeys.child.detail(id).queryKey,
    queryFn: () => {
      return fetchFn();
    },
  });
};

const useTempValue = () => {
  return useQuery<number | undefined>({
    queryKey: queryKeys.temp._def,
    queryFn: () => {
      return Promise.resolve(getRandomNumber(100, 1_000));
    },
  });
};

/**
 * @desc mutate는 mutateFn에서 resolve된 값을 반환
 * mutateAsync는 Promise 자체를 반환
 * mutateAsync는 에러 발생 시 쿼리 훅 내부 onError 뿐만 아니라 try catch로 error를 잡아야 함.
 */
function Child({ id }: { id: number }) {
  const queryClient = useQueryClient();

  const { data } = useQueryApiRandom(id);

  const temp = useTempValue();

  const mutate = useMutation({
    mutationFn: async () => {
      await Promise.reject('reject');
    },

    onMutate: () => {},

    onError: (a) => {
      console.log('on error callback rejected value: ' + a);
    },

    onSettled: async () => {
      console.log('on settled');
      queryClient.invalidateQueries({
        queryKey: queryKeys.child.detail(id).queryKey,
      });
      
      /** @desc 쿼리 무효화 후 최신 데이터를 받고 싶다면 async await */
      console.log(queryClient.getQueryData(queryKeys.temp._def));
      await queryClient.invalidateQueries({ queryKey: queryKeys.temp._def });
      console.log(queryClient.getQueryData(queryKeys.temp._def));
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
            console.log('mutate async error rejected value: ' + error);
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

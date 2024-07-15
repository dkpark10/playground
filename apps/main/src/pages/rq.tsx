import dynamic from "next/dynamic";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";
import { Suspense } from "react";
import { createQueryKeyStore } from "@lukemorales/query-key-factory";

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
      <Suspense fallback={<div>...child loading</div>}>
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
      </Suspense>
    </main>
  );
}

const useQueryApiRandom = (id: number) => {
  return useSuspenseQuery({
    queryKey: queryKeys.child.detail(id).queryKey,
    queryFn: () => fetchFn(),
  });
}

function Child({ id }: { id: number; }) {
  const queryClient = useQueryClient();

  const { data } = useQueryApiRandom(id)

  const mutate = useMutation({
    mutationFn: async () => {
      return await Promise.resolve();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.child.detail(id).queryKey });
    },
  });

  return (
    <>
      <button type="button" onClick={() => mutate.mutate()}>
        click
      </button>
      <div>child{id}-{data}</div>
    </>
  );
}

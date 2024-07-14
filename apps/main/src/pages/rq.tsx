import dynamic from "next/dynamic";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  }
  
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
      <Suspense fallback={<div>...child1 loading</div>}>
        <Child1 />
      </Suspense>
      <Suspense fallback={<div>...child2 loading</div>}>
        <Child2 />
      </Suspense>
      <Suspense fallback={<div>...child3 loading</div>}>
        <Child3 />
      </Suspense>
    </main>
  );
}

function Child1() {
  console.log('123 child render');

  const { data } = useQuery({
    queryKey: queryKeys.child.detail(1).queryKey,
    queryFn: () => fetchFn(),
    suspense: true,
    keepPreviousData: true,
  });

  return <div>child1-{data}</div>;
}

function Child2() {
  const { data } = useQuery({
    queryKey: queryKeys.child.detail(1).queryKey,
    // queryKey: ["child2"],
    queryFn: () => fetchFn(),
    suspense: true,
  });

  return <div>child2-{data}</div>;
}

function Child3() {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: queryKeys.child.detail(3).queryKey,
    queryFn: () => fetchFn(),
    suspense: true,
  });

  const mutate = useMutation({
    mutationFn: async () => {
      return await Promise.resolve();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.child.detail(1).queryKey });
    },
  });

  return (
    <>
      <button type="button" onClick={() => mutate.mutate()}>
        click
      </button>
      <div>child3-{data}</div>
    </>
  );
}

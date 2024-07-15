import dynamic from "next/dynamic";
import { useMutation, useSuspenseQueries, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
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

/**
 * 
 * @description 병렬처리 페이지
 */
export default function RqPage() {
  return <DynamicChildRoot />;
}

const DynamicChildRoot = dynamic(() => Promise.resolve(ChildRoot), {
  ssr: false,
});

function ChildRoot() {
  return (
    <Suspense fallback={<div>...loading</div>}>
      <Child />
    </Suspense>
  );
}

function Child() {
  const results = useSuspenseQueries({
    queries: [
      { queryKey: queryKeys.child.detail(1).queryKey, queryFn: fetchFn },
      { queryKey: queryKeys.child.detail(2).queryKey, queryFn: fetchFn },
      { queryKey: queryKeys.child.detail(3).queryKey, queryFn: fetchFn },
    ],
  });

  return (
    <>
      {results.map(({ data }, idx) => (
        <div key={idx}>{data}</div>
      ))}
    </>
  );
}

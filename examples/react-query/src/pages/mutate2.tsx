import React from 'react';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { createQueryKeyStore } from '@lukemorales/query-key-factory';

const getRandomNumber = (min = 0, max = 3_000) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const queryKeys = createQueryKeyStore({
  temp: null,
});

export default function Mutate2() {
  const queryClient = useQueryClient();

  const random = useQuery<number | null>({
    queryKey: queryKeys.temp._def,
    queryFn: () => null,
  });

  const { mutate } = useMutation({
    mutationFn: () => {
      return Promise.resolve();
    },

    onSuccess: () => {
      queryClient.setQueryData(queryKeys.temp._def, getRandomNumber(100));
    },
  });

  return (
    <React.Fragment>
      <button type="button" onClick={() => mutate()}>
        mutate click
      </button>
      <div>{random.data ? random.data : '널'}</div>
    </React.Fragment>
  );
}

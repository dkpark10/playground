'use client';

import { PropsWithChildren, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ModalContainer from '@/components/common/modal-container';

export default function GlobalProvider({ children }: PropsWithChildren) {
  // eslint-disable-next-line react/hook-use-state
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ModalContainer />
      {children}
    </QueryClientProvider>
  );
}

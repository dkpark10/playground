'use client';

import { PropsWithChildren, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ModalProvider from '@/components/modal/modal-provider';

export default function GlobalProvider({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>{children}</ModalProvider>
    </QueryClientProvider>
  );
}

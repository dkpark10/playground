'use client';

import type { PropsWithChildren } from 'react';
import { Suspense, use } from 'react';
import { handlers } from '@/mocks/handler';

const mockingEnabledPromise =
  typeof window !== 'undefined' && process.env.NODE_ENV === 'development'
    ? import('@/mocks/browser').then(async ({ worker }) => {
        await worker.start({
          onUnhandledRequest(request, print) {
            if (request.url.includes('_next')) {
              return;
            }
            print.warning();
          },
        });
        worker.use(...handlers);
      })
    : Promise.resolve();

export function MSWProvider({ children }: PropsWithChildren) {
  return (
    <Suspense fallback={null}>
      <MSWProviderWrapper>{children}</MSWProviderWrapper>
    </Suspense>
  );
}

function MSWProviderWrapper({ children }: PropsWithChildren) {
  use(mockingEnabledPromise);
  return <>{children}</>;
}

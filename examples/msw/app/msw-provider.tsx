'use client';

import { PropsWithChildren, Suspense, use } from 'react';
import { handlers } from '@/mocks/handlers';

const mockingEnabledPromise =
  typeof window !== 'undefined'
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

        console.log(worker.listHandlers());
      })
    : Promise.resolve();

export function MSWProvider({ children }: PropsWithChildren) {
  // If MSW is enabled, we need to wait for the worker to start,
  // so we wrap the children in a Suspense boundary until it's ready.
  return (
    <Suspense fallback={null}>
      <MSWProviderWrapper>{children}</MSWProviderWrapper>
    </Suspense>
  );
}

function MSWProviderWrapper({ children }: PropsWithChildren) {
  use(mockingEnabledPromise);
  return children;
}

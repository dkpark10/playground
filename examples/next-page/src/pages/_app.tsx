/* eslint-disable react/jsx-props-no-spreading */
// eslint-disable-next-line import/extensions
import type { AppProps } from 'next/app';
import { useState } from 'react';
import createCache from '@emotion/cache';
import { css, Global, CacheProvider } from '@emotion/react';

import { QueryClient, QueryClientProvider, HydrationBoundary } from '@tanstack/react-query';

const cache = createCache({ key: 'next' });

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          /** @see {@link https://github.com/TanStack/query/discussions/1685#discussioncomment-942380} */
          queries: {
            staleTime: 60 * 1000,
            retry: process.env.NODE_ENV === 'development' ? 0 : 3,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <CacheProvider value={cache}>
          <Global
            styles={css`
              *,
              *::before,
              *::after {
                padding: 0;
                margin: 0;
                box-sizing: border-box;
              }
            `}
          />
          <Component {...pageProps} />
        </CacheProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}

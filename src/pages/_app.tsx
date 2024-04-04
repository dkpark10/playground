/* eslint-disable react/jsx-props-no-spreading */
// eslint-disable-next-line import/extensions
import type { AppProps } from "next/app";
import { useState } from "react";
import { QueryClient, QueryClientProvider, Hydrate } from "@tanstack/react-query";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  // eslint-disable-next-line import/no-relative-packages
  // import('../../../../mock');
}

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          /** @see {@link https://github.com/TanStack/query/discussions/1685#discussioncomment-942380} */
          queries: {
            staleTime: 60 * 1000,
            retry: process.env.NODE_ENV === "development" ? 0 : 3,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}

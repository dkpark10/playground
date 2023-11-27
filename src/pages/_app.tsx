// eslint-disable-next-line import/extensions
import type { AppProps } from "next/app";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  // eslint-disable-next-line import/no-relative-packages
  // import('../../../../mock');
}

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: process.env.NODE_ENV === "development" ? 0 : 3,
//     },
//   },
// });

export default function App({ Component, pageProps }: AppProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
}

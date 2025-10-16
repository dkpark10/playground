import '../styles/globals.css';
import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { RefererProvider } from '@/components/referrer-provider';
import GlobalProvider from '@/components/provider';

export const metadata: Metadata = {
  title: 'next next',
  description: 'next next description',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko">
      <body>
        <div id="portal" />
        <GlobalProvider>
          <RefererProvider>{children}</RefererProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}

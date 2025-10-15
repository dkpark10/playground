import '../styles/globals.css';
import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { ReferrerProvider } from '@/components/referrer-provider';
import { mockServer } from '@/mocks/node';
import { MSWProvider } from '@/components/msw-provider';

export const metadata: Metadata = {
  title: 'next next',
  description: 'next next description',
  viewport: 'width=device-width, initial-scale=1',
};

// msw 가동
mockServer.listen();

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko">
      <body>
        <div id="portal" />
        <ReferrerProvider>
          <MSWProvider>{children}</MSWProvider>
        </ReferrerProvider>
      </body>
    </html>
  );
}

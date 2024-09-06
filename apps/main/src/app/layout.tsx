import './globals.css';
import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import GlobalProvider from '@/app/global-provider';

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
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}

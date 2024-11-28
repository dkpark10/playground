import './globals.css';
import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'funnel',
  description: 'next next description',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko">
      <body>
        <div id="portal" />
        {children}
      </body>
    </html>
  );
}

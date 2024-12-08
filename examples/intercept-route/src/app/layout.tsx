import './globals.css';
import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'intercept-route-example',
  description: 'intercept-route-example page',
  viewport: 'width=device-width, initial-scale=1',
};

interface RootLayoutProps {
  modal: React.ReactNode;
}

export default function RootLayout({ children, modal }: RootLayoutProps & PropsWithChildren) {
  return (
    <html lang="ko">
      <body>
        {children}
        {modal}
        <div id="modal-root" />
      </body>
    </html>
  );
}

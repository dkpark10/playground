import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { PropsWithChildren } from 'react';
import { Roboto } from 'next/font/google';

export const metadata: Metadata = {
  title: 'next next',
  description: 'next next description',
  viewport: 'width=device-width, initial-scale=1',
};

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

// const geistSans = localFont({
//   src: './fonts/GeistVF.woff',
//   variable: '--font-geist-sans',
//   weight: '100 900',
// });
// const geistMono = localFont({
//   src: './fonts/GeistMonoVF.woff',
//   variable: '--font-geist-mono',
//   weight: '100 900',
// });

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko">
      <body className={`${roboto.className}`}>
        <div id="portal" />
        {children}
      </body>
    </html>
  );
}

import { PropsWithChildren } from 'react';
import { headers } from 'next/headers';
import QueryStore from '@/components/query-store';

export default async function DynamicSlugLayout({ children }: PropsWithChildren) {
  const header = await headers();
  const referer = header.get('referer') || '';

  return (
    <>
      <QueryStore queryKey="referer" queryData={referer} />
      {children}
    </>
  );
}

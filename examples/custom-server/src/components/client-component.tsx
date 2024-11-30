'use client';

import { PropsWithChildren, useEffect, useState } from 'react';

const fakeFetch = async (): Promise<number> => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(123);
    }, 3000);
  });
};

export default function ClientComponent({ children }: PropsWithChildren) {
  const [data, setData] = useState(0);

  useEffect(() => {
    fakeFetch().then((res) => setData(res));
  }, []);

  return (
    <div>
      <div>client component 자식은 서버임</div>
      <div>data: {data}</div>
      {children}
    </div>
  );
}

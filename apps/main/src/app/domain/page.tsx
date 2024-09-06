import Image from 'next/image';
import React from 'react';

export const revalidate = 1;

let cnt = 0;

export default function NextNext() {
  cnt += 1;

  const invalidSrc = 'https://finance.zumst.com/content/5d12eac8_iStock-1306194594%20(1).jpg';
  const validSrc =
    'https://static.hubzum.zumst.com/hubzum/2022/08/19/13/decb1a2ec8cb4c0296748a1bb40ec6bd.jpg';

  return (
    <>
      <div>{cnt}</div>
      <Image src={cnt >= 5 ? invalidSrc : validSrc} width={100} height={100} alt="zzz" />
    </>
  );
}

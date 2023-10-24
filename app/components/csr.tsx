"use client";

import Image from "next/image";

export default function CsrComponent() {
  return (
    <>
      <Image
        priority
        width={100}
        height={100}
        src="https://shop.zumst.com/upload/best/2023/10/16/SZBC223417.png"
        alt="test"
      />
      <img width={100} height={100} src="https://shop.zumst.com/upload/best/2023/10/16/SZBC223417.png" alt="test" />
      <img width={100} height={100} src="api/random" alt="test" />
    </>
  );
}

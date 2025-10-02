'use client';

import { use } from 'react';
import Link from 'next/link';
import { useReferrer } from '@/hooks/use-referrer';

interface DynamicSlugPageProps {
  params: Promise<{ slug: string }>;
}

export default function DynamicSlugPage({ params }: DynamicSlugPageProps) {
  const { slug } = use(params);

  const nextSlug = Number(slug) + 1;
  const prevSlug = Number(slug) - 1;

  useReferrer();

  return (
    <>
      <h1>app router</h1>
      <div>{}</div>
      <Link href={`/dynamic/${nextSlug}`}>다음{nextSlug}</Link>
      <div>slug: {slug}</div>
      <Link href={`/dynamic/${prevSlug}`}>이전{prevSlug}</Link>
    </>
  );
}

// import { headers } from "next/headers";
// import Link from "next/link";

// interface BlogPageProps {
//   params: { slug: string };
// }

// export default function Page({ params }: BlogPageProps) {
//   const headersList = headers();
//   const referer = headersList.get("referer");

//   const nextSlug = Number(params?.slug) + 1;
//   const prevSlug = Number(params?.slug) - 1;

//   return (
//     <>
//       <h1>app router</h1>
//       <Link href={`/dynamic/${prevSlug}`}>이전{prevSlug}</Link>
//       <div>slug: {params?.slug}</div>
//       <p>Referrer: {referer}</p>
//       <Link href={`/dynamic/${nextSlug}`}>다음{nextSlug}</Link>
//     </>
//   );
// }

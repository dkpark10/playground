'use client';

import Link from 'next/link'
import { useParams } from "next/navigation";
import { useSafeContext } from '@/hooks/use-safe-context';
import { ReferrerContext } from '@/components/referrer-provider';

export default function DynamicSlugPage() {
  const params = useParams<{ slug: string }>();

  const nextSlug = Number(params?.slug) + 1;
  const prevSlug = Number(params?.slug) - 1;

  const { getReferrer } = useSafeContext(ReferrerContext);

  const onClick = () => {
    console.log(getReferrer());
  }

  return (
    <>
      <h1 onClick={onClick}>app router</h1>
      <Link href={`/dynamic/${prevSlug}`}>이전{prevSlug}</Link>
      <div>slug: {params?.slug}</div>
      <Link href={`/dynamic/${nextSlug}`}>다음{nextSlug}</Link>
    </>
  )
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

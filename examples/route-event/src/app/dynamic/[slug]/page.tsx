'use client';

import Link from 'next/link'
import { useParams } from "next/navigation";

export default async function DynamicSlugPage() {
  const params = useParams<{ slug: string }>();

  const nextSlug = Number(params?.slug) + 1;
  const prevSlug = Number(params?.slug) - 1;

  return (
    <>
      <h1>app router</h1>
      <Link href={`/dynamic/${nextSlug}`}>다음 페이지 {nextSlug}</Link>
      <div>slug: {params?.slug}</div>
      <Link href={`/dynamic/${prevSlug}`}>이전 페이지 {prevSlug}</Link>
    </>
  )
}

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

import Link from 'next/link';
import PageView from '@/components/page-view';
import ClickStat from '@/components/click-stat';

interface DynamicSlugPageProps {
  params: Promise<{ slug: string }>;
}

export default async function DynamicSlugPage({ params }: DynamicSlugPageProps) {
  const slug = (await params).slug;

  const nextSlug = Number(slug) + 1;
  const prevSlug = Number(slug) - 1;

  return (
    <>
      <h1>app router</h1>
      <PageView />
      <Link href={`/dynamic/${nextSlug}`}>다음{nextSlug}</Link>
      <div>slug: {slug}</div>
      <Link href={`/dynamic/${prevSlug}`}>이전{prevSlug}</Link>

      <div>
        <ClickStat>
          <button type="button">레퍼러 클릭 통계 버튼</button>
        </ClickStat>
      </div>
    </>
  );
}

import Link from 'next/link';
import PageView from '@/components/page-view';
import ClickStat from '@/components/click-stat';
import { ForwardkButton, GoBackButton } from '@/components/history-button';

interface DynamicSlugPageProps {
  params: Promise<{ slug: string }>;
}

export default async function DynamicSlugPage({ params }: DynamicSlugPageProps) {
  const slug = (await params).slug;

  const nextSlug = Number(slug) + 1;

  return (
    <>
      <h1>app router</h1>
      <PageView />

      <div>
        <ForwardkButton type='button'>앞으로</ForwardkButton>
      </div>

      <div>
        <Link href={`/dynamic/${nextSlug}`}>다음 페이지 이동 {nextSlug}</Link>

      </div>

      <div>
        <GoBackButton type='button'>뒤로</GoBackButton>
      </div>

      <div style={{ marginTop: 20 }}>
        <ClickStat>
          <button type="button">레퍼러 클릭 통계 버튼</button>
        </ClickStat>
      </div>
    </>
  );
}

import SwiperWrapper from '@/components/swiper/wrapper';
import Content from '@/components/swiper/lcp-content';

interface SwiperContentProps {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const getData = async (): Promise<SwiperContentProps[]> => {
  const arr = Array.from({ length: 4 }, (_, idx) => idx + 1);

  const data: SwiperContentProps[] = await Promise.all(
    arr.map((i) => fetch(`https://jsonplaceholder.typicode.com/photos/${i}`).then((res) => res.json())),
  );

  return data;
};

export default async function SwiperPage() {
  const data = await getData();

  return (
    <SwiperWrapper>
      {data.map((d) => (
        <Content key={d.id} title={d.title} url={d.url} data-img-url={d.url} />
      ))}
      <div>123</div>
    </SwiperWrapper>
  );
}

import SwiperWrapper from '@/components/swiper/wrapper';
import Content from '@/components/swiper/content';

interface SwiperContentProps {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const getData = async (): Promise<SwiperContentProps[]> => {
  const arr = Array.from({ length: 10 }, (_, idx) => idx + 1);

  const data: SwiperContentProps[] = await Promise.all(
    arr.map((i) => fetch(`https://jsonplaceholder.typicode.com/photos/${i}`).then((res) => res.json())),
  );

  return data;
};

export default async function SwiperPage() {
  const data = await getData();

  const top = data.slice(0, 4);
  const rest = data.slice(4);

  return (
    <>
      <SwiperWrapper>
        {top.map((d) => (
          <Content key={d.id} preload title={d.title} url={d.url} data-img-url={d.url} />
        ))}
      </SwiperWrapper>
      {rest.map((d) => (
        <Content key={d.id} title={d.title} url={d.url} data-img-url={d.url} />
      ))}
    </>
  );
}

import Image from 'next/image';
import style from './lcp-content.module.scss';

interface SwiperContentProps {
  title: string;
  url: string;
}

export default function SwiperContent({ title, url }: SwiperContentProps) {
  return (
    <div className={style['container']}>
      <Image src={url} width={300} height={300} alt={title} />
    </div>
  );
}

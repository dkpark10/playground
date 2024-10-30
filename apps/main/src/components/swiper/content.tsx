import Image from 'next/image';
import style from './content.module.scss';

interface SwiperContentProps {
  title: string;
  url: string;
  preload?: boolean;
}

export default function SwiperContent({ title, url, preload = false }: SwiperContentProps) {
  const size = preload ? 300 : 100;

  return (
    <div className={style['container']}>
      <Image src={url} width={size} height={size} alt={title} priority={preload} />
    </div>
  );
}

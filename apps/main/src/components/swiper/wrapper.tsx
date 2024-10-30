'use client';

import { Swiper as SwiperContainer, SwiperSlide } from 'swiper/react';
import { Children, type PropsWithChildren } from 'react';

// Import Swiper styles
import 'swiper/css';

export default function SwiperWrapper({ children }: PropsWithChildren) {
  return (
    <SwiperContainer spaceBetween={50} slidesPerView={1} onSlideChange={() => console.log('slide change')}>
      {Children.map(children, (child) => (
        <SwiperSlide>{child}</SwiperSlide>
      ))}
    </SwiperContainer>
  );
}

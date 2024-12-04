import Image from 'next/image';

/** 
 * @description 이미지의 우선순위을 파악하는 페이지
 * priority > eager > lazy
 * 두개의 이미지의 priority가 true고 마지막 이미지에 eager가 할당되어도 앞에 이미지가 먼저 로드된다.
 * priority && lazy 일 때 에러
*/
export default function ImgPage() {
  return (
    <div>
      <Image src="https://via.placeholder.com/200/d32776" width={200} height={200} alt="weather1" />
      <Image
        loading="eager"
        src="https://via.placeholder.com/400/771796"
        width={400}
        height={400}
        alt="weather2"
      />
      <Image
        priority
        src="https://via.placeholder.com/600/24f355"
        width={600}
        height={600}
        alt="weather3"
      />
    </div>
  );
}

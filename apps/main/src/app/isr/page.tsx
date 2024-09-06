import DynamicComponent from '@/components/dynamic';

export const revalidate = 5;

export default function NextNext() {
  return (
    <>
      <h1>서드파티 랜덤 api를 호출하지않는 isr 페이지</h1>
      <DynamicComponent
        renderMode="isr"
        ran1={Math.floor(Math.random() * 100)}
        ran2={Math.floor(Math.random() * 100)}
        revalidate="no revalidate"
        ranOtherServerApiResponse={[]}
      />
    </>
  );
}

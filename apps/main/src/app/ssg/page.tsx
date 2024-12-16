import DynamicComponent from '@/components/dynamic';

export default function NextNext() {
  console.log(123, typeof window);
  return (
    <>
      <h1>서드파티 랜덤 api를 호출하지않는 ssg 페이지</h1>
      <DynamicComponent
        renderMode="ssg"
        ran1={Math.floor(Math.random() * 100)}
        ran2={Math.floor(Math.random() * 100)}
        revalidate="no revalidate"
        ranOtherServerApiResponse={[]}
      />
    </>
  );
}

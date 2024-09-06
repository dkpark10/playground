import DynamicComponent, { type RandomResponse } from '@/components/dynamic';

const getRandomJsonData = async (ranBaseAt = '', option?: RequestInit) => {
  const result = await fetch(`https://randomuser.me/api?ran=${ranBaseAt}`, option).then(
    (res): Promise<RandomResponse> => res.json(),
  );
  return result.results[0];
};

export default async function NextNext() {
  const baseAt = new Date().toISOString().match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}/)?.[0] || '';
  console.log(baseAt);

  const results = await getRandomJsonData();
  const results2 = await getRandomJsonData(baseAt);
  const results3 = await getRandomJsonData('', { next: { revalidate: 5 } });
  const results4 = await getRandomJsonData(baseAt, { next: { revalidate: 5 } });

  return (
    <>
      <h1>서드파티 랜덤 api를 호출하는 ssg 페이지</h1>
      <DynamicComponent
        renderMode="ssg"
        ran1={Math.floor(Math.random() * 100)}
        ran2={Math.floor(Math.random() * 100)}
        revalidate="no revalidate"
        ranOtherServerApiResponse={[results, results2, results3, results4]}
      />
    </>
  );
}

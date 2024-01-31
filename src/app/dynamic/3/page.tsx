import { nextFetchClient } from "@/utils/next-fetch-client";
import DynamicComponent, { type RandomResponse } from "@/components/dynamic";

export const revalidate = 0;

const getRandomJsonData = async (ranBaseAt = "", option?: RequestInit) => {
  const result = await fetch(`https://randomuser.me/api?ran=${ranBaseAt}`, option).then(
    (res): Promise<RandomResponse> => res.json(),
  );
  return result.results[0];
};

const getTodoData = async () => {
  const baseAt = new Date().toISOString().match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}/)?.[0] || "";
  return Promise.all([
    nextFetchClient.get<number>(`/api/random?ran=${baseAt}`),
    nextFetchClient.get<number>("/api/random2"),
  ]);
};

export default async function NextNext() {
  const baseAt = new Date().toISOString().match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}/)?.[0] || "";
  console.log(baseAt);

  const [ran1, ran2] = await getTodoData();
  const results = await getRandomJsonData();
  const results2 = await getRandomJsonData(baseAt);
  const results3 = await getRandomJsonData("", { next: { revalidate: 3 } });
  const results4 = await getRandomJsonData(baseAt, { next: { revalidate: 3 } });

  return (
    <DynamicComponent
      renderMode="ssr"
      ran1={ran1}
      ran2={ran2}
      revalidate={revalidate}
      ranOtherServerApiResponse={[results, results2, results3, results4]}
    />
  );
}

import { nextFetchClient } from "@/utils/next-fetch-client";
import Image from "next/image";
import ClientComponent from "@/components/csr";

export const dynamic = "force-dynamic";
export const revalidate = 2;

interface Random {
  results: Array<{
    gender: string;
    name: {
      title: string;
      first: string;
      last: string;
    };
    location: {
      street: {
        number: number;
        name: string;
      };
      city: string;
      state: string;
      country: string;
      postcode: number;
      coordinates: {
        latitude: string;
        longitude: string;
      };
      timezone: {
        offset: string;
        description: string;
      };
    };
    email: string;
    login: {
      uuid: string;
      username: string;
      password: string;
      salt: string;
      md5: string;
      sha1: string;
      sha256: string;
    };
    dob: {
      date: string;
      age: number;
    };
    registered: {
      date: string;
      age: number;
    };
    phone: string;
    cell: string;
    id: {
      name: string;
      value: string;
    };
    picture: {
      large: string;
      medium: string;
      thumbnail: string;
    };
    nat: string;
  }>;
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

const getRandomJsonData = async () => {
  const result = await fetch("https://randomuser.me/api").then((res): Promise<Random> => res.json());
  return result;
};

const getRandomJsonDataCache = async () => {
  const result = await fetch("https://randomuser.me/api", { next: { revalidate: 2 } }).then(
    (res): Promise<Random> => res.json(),
  );
  return result;
};

const getTodoData = async () => {
  return Promise.all([nextFetchClient.get<number>("/api/random"), nextFetchClient.get<number>("/api/random2")]);
};

export default async function NextNext() {
  const [ran1, ran2] = await getTodoData();
  const { results } = await getRandomJsonData();
  const { results: results2 } = await getRandomJsonDataCache();

  return (
    <>
      <div>해당페이지는 revalidate 설정된 페이지 isr임</div>
      <div>해당 값은 로컬 next api에서 revalidate=2 설정된 값 {ran1}</div>
      <div>해당 값은 로컬 next api에서 revalidate 설정 안된 값 {ran2}</div>

      <Image width={100} height={100} src="https://shop.zumst.com/upload/best/2023/10/16/SZBC223417.png" alt="test" />

      <ClientComponent
        value1={results[0].gender}
        value2={results[0].name.title}
        value3={results[0].name.first}
        value4={results[0].name.last}
      />

      <div>아래 영역은 다른 도메인 랜덤 api revalidate=2 설정된 데이터</div>
      <ClientComponent
        value1={results2[0].gender}
        value2={results2[0].name.title}
        value3={results2[0].name.first}
        value4={results2[0].name.last}
      />
    </>
  );
}

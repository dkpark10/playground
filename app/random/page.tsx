export const dynamic = "force-dynamic";

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

export default async function NextNext() {
  const { results } = await getRandomJsonData();
  return (
    <>
      <div>해당 페이지는 도메인이 다른 랜덤 데이터 api를 호출하는 페이지</div>
      <div>{results[0].gender}</div>
      <div>
        {results[0].name.title}
        {results[0].name.first}
        {results[0].name.last}
      </div>
    </>
  );
}

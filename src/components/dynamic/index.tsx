import ClientComponent from "@/components/csr";

export interface RandomResponse {
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

interface DynamicComponentProps {
  renderMode: "isr" | "ssg" | "ssr";
  revalidate: number | string;
  ran1: number;
  ran2: number;
  ranOtherServerApiResponse?: RandomResponse["results"];
  dynamic?: string;
}

export default function DynamicComponent({
  renderMode,
  revalidate,
  dynamic,
  ran1,
  ran2,
  ranOtherServerApiResponse,
}: DynamicComponentProps) {
  return (
    <>
      <h1>
        해당페이지는 revalidate {revalidate}, dynamic {dynamic} 설정된 페이지{" "}
        <span className="text-red-600">{renderMode}</span>
      </h1>
      <div>{new Date().getTime()}</div>
      <div>
        해당 값은 로컬 next api에서 revalidate=2 설정된 값 <span className="text-red-600">{ran1}</span>
      </div>
      <div>
        해당 값은 로컬 next api에서 revalidate 설정 안된 값 <span className="text-red-600">{ran2}</span>
      </div>

      <br />
      <div>캐시 X 랜덤쿼리 X</div>
      {ranOtherServerApiResponse?.[0] && (
        <ClientComponent
          value1={ranOtherServerApiResponse[0].gender}
          value2={ranOtherServerApiResponse[0].name.title}
          value3={ranOtherServerApiResponse[0].name.first}
          value4={ranOtherServerApiResponse[0].name.last}
        />
      )}

      <div>캐시 X 랜덤쿼리 O</div>
      {ranOtherServerApiResponse?.[1] && (
        <ClientComponent
          value1={ranOtherServerApiResponse[1].gender}
          value2={ranOtherServerApiResponse[1].name.title}
          value3={ranOtherServerApiResponse[1].name.first}
          value4={ranOtherServerApiResponse[1].name.last}
        />
      )}

      <div>캐시 O 랜덤쿼리 X</div>
      {ranOtherServerApiResponse?.[2] && (
        <ClientComponent
          value1={ranOtherServerApiResponse[2].gender}
          value2={ranOtherServerApiResponse[2].name.title}
          value3={ranOtherServerApiResponse[2].name.first}
          value4={ranOtherServerApiResponse[2].name.last}
        />
      )}

      <div>캐시 O 랜덤쿼리 O</div>
      {ranOtherServerApiResponse?.[3] && (
        <ClientComponent
          value1={ranOtherServerApiResponse[3].gender}
          value2={ranOtherServerApiResponse[3].name.title}
          value3={ranOtherServerApiResponse[3].name.first}
          value4={ranOtherServerApiResponse[3].name.last}
        />
      )}
    </>
  );
}

DynamicComponent.defaultProps = {
  dynamic: "",
  ranOtherServerApiResponse: undefined,
};

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { fetchClient } from "@/utils";
import { SECOND } from "@/constants";
import { useEffect, useState } from "react";

/**
 * @description reactquery가 리페치 되는 조건
 *
 *  1. query key에 react state를 포함시키고, state가 변경되면 refetch
 *  2. refetchOnWindowFocus >> 데이터가 stale 상태일 경우 윈도우에 포커즈가 이동될 때 마다 refetch
 *  3. refetchOnMount >> 마운트 될 때마다 refetch
 *  4. refetchOnReconnect >> 연결이 끊어졌다가 재 연결 되었을 때 refetch
 *  5. clientQuery.invalidateQueries() >> 고의로 쿼리 무효화를 했을 때 refetch, 서버 데이터를 변경한 후 새로운 데이터를 받아오기 위해 고의로 쿼리를 무효화 >> 데이터가 바로 stale 상태로 변경됨과 동시에 refetch 실행
 *  6. 명시적으로 refetch 함수를 호출 할 때
 */
export default function Tiny() {
  const { data } = useQuery(["random"], () => fetchClient.get<{ name: string }>("api/random"), {
    staleTime: 5 * SECOND,
  });

  const [v, sv] = useState("");
  const [v2, sv2] = useState("");

  const changeV = async () => {
    const {
      data: { name },
    } = await fetchClient.get<{ name: string }>("api/random");

    sv(name);

    const {
      data: { constt },
    } = await fetchClient.get<{ constt: string }>("api/constants");

    sv2(constt);
  };

  useEffect(() => {
    changeV();
  }, []);

  return (
    <>
      <div>테스트 타이니: {data?.data.name}</div>
      <div>api handler: {v}</div>
      <div>const handler: {v2}</div>
      <button type="button" onClick={() => changeV()}>
        click jacking
      </button>
      <Image
        alt="test"
        src="https://shop.zumst.com/upload/best/2023/07/06/SZBC014355_4.png"
        // src="https://shop.zumst.com/upload/banner/2023/06/28/sb_bottom132601.jpg"
        width={390}
        height={270}
        priority
      />
      <img alt="test" src="https://shop.zumst.com/upload/best/2023/07/06/SZBC014355_4.png" />
    </>
  );
}

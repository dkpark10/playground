import dynamic from "next/dynamic";
import { Suspense, lazy } from "react";
// import Tiny from "@/components/tiny";

// eslint-disable-next-line no-promise-executor-return
const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

// const Tiny = lazy(async () => {
//   await sleep(1000);
//   return import("@/components/tiny");
// });

function Loading() {
  return (
    <div style={{ border: "1px solid red" }}>
      <h1>loading...</h1>
    </div>
  );
}

const DynamicComponent = dynamic(
  async () => {
    await sleep(1000);
    return import("@/components/tiny");
  },
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

export default function CsrSuspense() {
  return <DynamicComponent />;
}

// const DynamicHeader = dynamic(() => import('../components/header'), {
//   loading: () => <p>Loading...</p>,
// });

// export default function Home() {
//   return <DynamicHeader />;
// }

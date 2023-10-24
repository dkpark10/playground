import dynamic from "next/dynamic";

const CsrComponent = dynamic(() => import("@/components/csr"), { ssr: false });

export default function CsrPage() {
  return <CsrComponent />;
}

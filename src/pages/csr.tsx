import dynamic from "next/dynamic";

export default dynamic(() => Promise.resolve(() => <div>Csr Page</div>), {
  ssr: false,
});

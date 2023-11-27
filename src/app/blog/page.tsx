import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

export default function BlogPage() {
  return <Editor />;
}

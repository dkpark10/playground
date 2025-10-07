import Client from "@/components/client";

export default async function ServerPage() {
  new IntersectionObserver((_) => {
  });

  return (
    <>
      <div>server page</div>
      <Client />
    </>)
}

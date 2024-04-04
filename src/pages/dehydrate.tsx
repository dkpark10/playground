import { useQuery } from "@tanstack/react-query";

const tempFetch = () => {
  const value = Math.floor(Math.random() * 100);
  return Promise.resolve(` random: ${value}`);
};

export default function PagePage() {
  const { data: value } = useQuery(["test-query"], tempFetch);
  console.log("dehydrate page", value);

  return (
    <main>
      <div>ssg page{value}</div>
    </main>
  );
}

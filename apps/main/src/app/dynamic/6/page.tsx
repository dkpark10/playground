export const revalidate = 10;

export default function NextNext() {
  const baseAt = new Date().toISOString().match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}/)?.[0] || '';
  console.log(baseAt);

  return (
    <>
      <div>날짜 {baseAt}</div>
      <div>revaildate 10초</div>
      <div>{new Date().toLocaleString()}</div>
    </>
  );
}

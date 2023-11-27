export const revalidate = 0;

export default function NextNext() {
  return (
    <>
      <div>순수한 ssr;;;</div>
      <div>{new Date().toLocaleString()}</div>
    </>
  );
}

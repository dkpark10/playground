export const getServerSideProps = () => {
  throw new Error("123");
};

export default function TestPage() {
  return <div>123</div>;
}

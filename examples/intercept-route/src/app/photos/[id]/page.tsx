export const dynamicParams = false;

export function generateStaticParams() {
  return ['1', '2', '3', '4', '5', '6'].map((id) => ({ id }));
}

export default function PhotoPage({ params }: { params: { id: string; } }) {
  return <div className="card">photo-{params.id}</div>;
}

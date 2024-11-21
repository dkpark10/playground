import Link from 'next/link';

export default function NextNext() {
  const list = Array.from({ length: 6 }, (_, i) => i + 1);

  return (
    <section className="cards-container">
      {list.map((item) => (
        <Link className="card" key={item} href={`/photos/${item}`} passHref>
          {item}
        </Link>
      ))}
    </section>
  );
}

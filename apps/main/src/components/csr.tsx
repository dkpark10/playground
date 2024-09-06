'use client';

interface ClientComponentProps {
  value1: string;
  value2: string;
  value3: string;
  value4: string;
}

export default function ClientComponent({ value1, value2, value3, value4 }: ClientComponentProps) {
  return (
    <div className="border border-slate-400">
      해당 값은 타서버 랜덤 api 호출 해서 클라이언트 컴포넌트에 주입된 값<div>{value1}</div>
      <div>{value2}</div>
      <div>{value3}</div>
      <div>{value4}</div>
    </div>
  );
}

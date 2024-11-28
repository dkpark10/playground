import React from 'react';
import StepButton from '@/components/step-button';
import Link from 'next/link';

let cnt = 1;
const fakeFetchQuiz = () => {
  const quiz = {
    title: '초간단 퀴즈',
    qs: [
      {
        q: '1 + 1',
        a: ['2', '보석상이 100만원 손해'],
      },
      {
        q: '인생이란?',
        a: ['고뇌', '몰라'],
      },
      {
        q: '행복은 어디에?',
        a: ['라면', '스파링 정타'],
      },
    ],
  };

  return Promise.resolve(quiz);
};

interface QuizPageProps {
  searchParams: {
    order: string;
  };
}

export default async function QuizPage({ searchParams }: QuizPageProps) {
  const quiz = await fakeFetchQuiz();

  const idx = !searchParams.order || Number(searchParams.order) >= 3 ? 0 : searchParams.order;

  const qs = quiz.qs[Number(idx)];

  return (
    <React.Fragment>
      <main>server-data {quiz.title}</main>
      <div>질문: {qs.q}</div>
      <StepButton>{qs.a[0]}</StepButton>
      <StepButton>{qs.a[1]}</StepButton>
      <div>
        <Link href={`?order=${Number(idx) + 1}`}>{qs.a[0]}</Link>
      </div>
      <div>
        <Link href={`?order=${Number(idx) + 1}`}>{qs.a[1]}</Link>
      </div>
    </React.Fragment>
  );
}

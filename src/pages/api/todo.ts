// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Todo } from "global-type";

const todoList: Array<Todo> = [
  {
    title: "next 공부하기",
    isCompleted: false,
    id: "todo-1",
  },
  {
    title: "react query 공부하기",
    isCompleted: true,
    id: "todo-2",
  },
  {
    title: "성공하기",
    isCompleted: true,
    id: "todo-3",
  },
  {
    title: "부동산, 주식, 현금 다합쳐서 500억 이상 벌기",
    isCompleted: false,
    id: "todo-4",
  },
  {
    title: "불로 불사 하기",
    isCompleted: true,
    id: "todo-5",
  },
];

export default function handler(_: NextApiRequest, res: NextApiResponse<{ todoList: Array<Todo> }>) {
  return res.status(200).send({ todoList });
}

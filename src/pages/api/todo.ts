// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { logger } from "@/utils/logger";
import fs from "fs/promises";
import { CACHE_CONTROL, CACHE_PUBLIC_MAX_1YEAR } from "@/constants/header";
import { Todo } from "global-type";

let todoList: Array<Todo> = [
  {
    title: "next 공부하기",
    isCompleted: false,
    id: "d17f5df1-bb8c-4912-9a9b-e829c114237f ",
  },
  {
    title: "react query 공부하기",
    isCompleted: false,
    id: "0adfcd9f-d4ed-4c62-a8e3-ea97cabe5ced ",
  },
  {
    title: "성공하기",
    isCompleted: false,
    id: "526a9c68-25fd-48b2-8d78-87cf2ce3f8c3",
  },
  {
    title: "부동산, 주식, 현금 다합쳐서 500억 이상 벌기",
    isCompleted: false,
    id: "a0d45e10-9bce-40f1-8d6a-0975ff6b0d01",
  },
  {
    title: "불로 불사 하기",
    id: "1641abd5-7da7-4051-9821-77d44c225cd7",
    isCompleted: false,
  },
];

export default function TodoApiHandler(request: NextApiRequest, response: NextApiResponse) {
  const method = request.method?.toUpperCase();
  // const root = path.resolve();
  // const todoPath = path.join(root, "/src/mock/assets/todo.json");
  // const data = await fs.readFile(todoPath);
  // const todoList = JSON.parse(data.toString()) as Array<Todo>;

  try {
    if (method === "GET") {
      return response.status(200).setHeader(CACHE_CONTROL, CACHE_PUBLIC_MAX_1YEAR).send(todoList);
    }

    if (method === "POST") {
      const newTodo = request.body as Todo;
      todoList = [...todoList, newTodo];
      return response.status(201).end();
    }

    if (method === "PUT") {
      const updatedTodo = request.body as Todo;
      todoList = todoList.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo));
      // await fs.writeFile(todoPath, JSON.stringify(updatedTodoList, null, 2));
      return response.status(201).end();
    }

    if (method === "DELETE") {
      const deleteId = request.body as Todo["id"];
      todoList = todoList.filter((todo) => todo.id !== deleteId);
      return response.status(201).end();
    }
  } catch (error) {
    logger.error(`[api error]: ${method || "GET"}/todo`);
    return response.status(500).end();
  }
}

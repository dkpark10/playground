// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs/promises";
import { Todo } from "global-type";

export default async function handler(_: NextApiRequest, res: NextApiResponse<{ todoList: Array<Todo> }>) {
  try {
    const root = path.resolve();
    const todoPath = path.join(root, "/src/mock/assets/todo.json");
    const data = await fs.readFile(todoPath);
    const todoList = JSON.parse(data.toString()) as Array<Todo>;
    return res.status(200).send({ todoList });
  } catch (error) {
    return res.status(500).end();
  }
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { logger } from "@/utils/logger";
import fs from "fs/promises";
import { Todo } from "global-type";

export default async function TodoApiHandler(request: NextApiRequest, response: NextApiResponse) {
  const method = request.method?.toUpperCase();
  const root = path.resolve();
  const todoPath = path.join(root, "/src/mock/assets/todo.json");
  const data = await fs.readFile(todoPath);
  const todoList = JSON.parse(data.toString()) as Array<Todo>;

  try {
    if (method === "GET") {
      return response.status(200).send(todoList);
    }

    if (method === "PUT") {
      console.log(request.body);
      return response.status(201).end();
    }
  } catch (error) {
    logger.error(`[api error]: ${method || "GET"}/todo`);
    return response.status(500).end();
  }
}

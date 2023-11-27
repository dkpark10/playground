"use server";

import { revalidateTag } from "next/cache";
import { Todo } from "@/schema/todo";
import { nextFetchClient } from "@/utils/next-fetch-client";

export async function createTodo(todo: Todo) {
  revalidateTag("todo");
  return nextFetchClient.post("/api/todo", {
    body: JSON.stringify(todo),
  });
}

export async function deleteTodo(todoId: Todo["id"]) {
  revalidateTag("todo");
  return nextFetchClient.delete("/api/todo", {
    body: JSON.stringify(todoId),
  });
}

export async function updateTodo(todo: Todo) {
  revalidateTag("todo");
  return nextFetchClient.put("/api/todo", {
    body: JSON.stringify({
      ...todo,
    }),
  });
}

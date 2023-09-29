"use server";

import { revalidateTag } from "next/cache";
import { Todo } from "@/schema/todo";
import { nextFetchClient } from "@/utils/next-fetch-client";

export async function deleteTodo(todoId: Todo["id"]) {
  await nextFetchClient.delete("/api/todo", {
    body: JSON.stringify(todoId),
  });
  revalidateTag("todo");
}

export async function updateTodo(todo: Todo) {
  await nextFetchClient.put("/api/todo", {
    body: JSON.stringify({
      ...todo,
    }),
  });
  revalidateTag("todo");
}

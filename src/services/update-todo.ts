import { fetchClient } from "@/utils";
import { Todo } from "global-type";

export const updateTodo = async (id: Todo["id"]) => {
  const { data } = await fetchClient.patch<Todo, Todo["id"]>("/todo", id);
  return data;
};

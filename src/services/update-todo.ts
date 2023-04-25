import { fetchClient } from "@/utils";
import { Todo } from "global-type";

export const createTodo = async (id: Todo["id"]) => {
  const { data } = await fetchClient.patch<Todo>("/todo", id);
  return data;
};

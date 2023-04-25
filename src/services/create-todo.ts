import { fetchClient } from "@/utils";
import { Todo } from "global-type";

export const createTodo = async (newTodo: Todo) => {
  const { data } = await fetchClient.post<Todo, Todo>("/todo", newTodo);
  return data;
};

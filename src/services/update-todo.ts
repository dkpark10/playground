import { fetchClient } from "@/utils";
import { Todo } from "global-type";

export const updateTodo = async (todo: Todo) => {
  const { data } = await fetchClient.put("api/todo", todo);
  return data;
};

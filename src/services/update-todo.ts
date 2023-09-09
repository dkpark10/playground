import { fetchClient } from "@/utils";
import { Todo } from "global-type";

export const updateTodo = async (todo: Todo) => {
  const { data } = await fetchClient.put("api/todo", todo);
  console.log("123", data);
  return data;
};

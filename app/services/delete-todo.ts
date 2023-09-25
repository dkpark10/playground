import { fetchClient } from "@/utils";
import { Todo } from "global-type";

export const deleteTodo = async (deletedTodoId: Todo["id"]) => {
  const { data } = await fetchClient.delete("api/todo", { data: deletedTodoId });
  return data;
};

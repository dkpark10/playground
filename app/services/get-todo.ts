import { fetchClient } from "@/utils";
import { Todo } from "global-type";

export const getTodo = async () => {
  const { data } = await fetchClient.get<Array<Todo>>("api/todo");
  return data;
};

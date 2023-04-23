import { fetchClient } from "@/utils";
import { Todo } from "global-type";

export const getTodo = async () => {
  const { data } = await fetchClient.get<{ todoList: Todo[] }>("/todo");
  return data;
};

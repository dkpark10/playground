import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { fetchClient } from "@/utils";
import type { Todo } from "@/schema/todo";

export const createTodo = async (newTodo: Todo) => {
  const { data } = await fetchClient.post<Todo, Todo>("api/todo", newTodo);
  return data;
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation((newTodo: Todo) => createTodo(newTodo), {
    onMutate: async (newTodo: Todo) => {
      await queryClient.cancelQueries({ queryKey: ["todo"] });
      const prevTodoList = queryClient.getQueryData<Array<Todo>>(["todo"]);

      if (prevTodoList) {
        queryClient.setQueryData(["todo"], [...prevTodoList, newTodo]);
      }
    },

    onError: () => {
      toast.error("투두 생성 error");
    },

    onSettled: () => {
      queryClient.invalidateQueries(["todo"]);
      toast.success("투두 생성 성공");
    },
  });
};

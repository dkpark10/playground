import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { fetchClient } from "@/utils";
import type { Todo } from "@/schema/todo";

export const updateTodo = async (todo: Todo) => {
  const { data } = await fetchClient.put("api/todo", todo);
  return data;
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation((updatedTodo: Todo) => updateTodo(updatedTodo), {
    onMutate: async (updatedTodo: Todo) => {
      await queryClient.cancelQueries({ queryKey: ["todo"] });
      const prevTodoList = queryClient.getQueryData<Array<Todo>>(["todo"]);

      queryClient.setQueryData(
        ["todo"],
        prevTodoList?.map((todo) => (updatedTodo.id === todo.id ? updatedTodo : todo)),
      );
    },

    onError: () => {
      toast.error("게시글 업데이트 error");
    },

    onSettled: () => {
      queryClient.invalidateQueries(["todo"]);
      toast.success("게시글 업데이트 성공");
    },
  });
};

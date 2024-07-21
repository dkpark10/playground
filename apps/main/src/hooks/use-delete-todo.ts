import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { fetchClient } from "@/utils";
import type { Todo } from "@/schema/todo";

export const deleteTodo = async (deletedTodoId: Todo["id"]) => {
  const { data } = await fetchClient.delete("api/todo", { data: deletedTodoId });
  return data;
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (deletedTodoId: Todo["id"]) => deleteTodo(deletedTodoId),

    onMutate: async (deletedTodoId: Todo["id"]) => {
      await queryClient.cancelQueries({ queryKey: ["todo"] });
      const prevTodoList = queryClient.getQueryData<Array<Todo>>(["todo"]);

      queryClient.setQueryData(
        ["todo"],
        prevTodoList?.filter((todo) => deletedTodoId !== todo.id),
      );
    },

    onError: () => {
      toast.error("게시글 삭제 error");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
      toast.success("게시글 삭제 성공");
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteTodo } from "@/services";
import { Todo } from "global-type";

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation((deletedTodoId: Todo["id"]) => deleteTodo(deletedTodoId), {
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
      queryClient.invalidateQueries(["todo"]);
      toast.success("게시글 삭제 성공");
    },
  });
};

import { Toaster } from "react-hot-toast";
import Link from "next/link";
import { QueryClient } from "@tanstack/react-query";
import { nextFetchClient } from "@/utils/next-fetch-client";
import { Todo } from "@/schema/todo";
import TodoItem from "@/components/todo/item";
import TodoInput from "@/components/todo/input";
import { logger } from "@/utils/logger";
import TodoModal from "@/components/todo/modal";

const getTodoData = async () => {
  const res = await nextFetchClient.get<Array<Todo>>("/api/todo", {
    next: { tags: ["todo"] },
  });
  return res;
};

export default async function NextNext() {
  logger.log(
    "info",
    `[RUNTIME_ENV]: ${process.env.NODE_ENV || ""} [BASE_URL]: ${process.env.NEXT_PUBLIC_BASE_URL || ""}`,
  );
  const todoList = await getTodoData();
  const queryClient = new QueryClient();
  queryClient.setQueryData(["todo"], todoList);

  return (
    <>
      <Toaster />

      <TodoModal />

      <Link href="/static">
        <header className="text-center text-2xl py-2">Next Next</header>
      </Link>

      <main>
        <TodoInput />

        {todoList?.map((todo) => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </main>
    </>
  );
}

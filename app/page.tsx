import { Toaster } from "react-hot-toast";
import Link from "next/link";
import { QueryClient } from "@tanstack/react-query";
import { Todo } from "@/schema/todo";
import { nextFetchClient } from "@/utils/next-fetch-client";
import TodoItem from "@/components/todo/item";
import TodoInput from "@/components/todo/input";
import TodoModal from "./components/todo/modal";

const getTodoData = async () => {
  const res = await nextFetchClient.get<Array<Todo>>("/api/todo", {
    next: { tags: ["todo"] },
  });
  return res;
};

export default async function NextNext() {
  // useEffect(() => {
  //   // eslint-disable-next-line no-console
  //   console.log(process.env.NEXT_PUBLIC_BASE_URL);
  // }, []);

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

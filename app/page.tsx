import { Toaster } from "react-hot-toast";
import Link from "next/link";
import { Todo } from "@/schema/todo";
import TodoItem from "@/components/todo/item";
import TodoInput from "@/components/todo/input";
import TodoModal from "./components/todo/modal";

const getTodoData = async () => {
  const res = await fetch("http://localhost:3000/api/todo", {
    next: { revalidate: Infinity },
  });

  return res.json() as Promise<Array<Todo>>;
};

export default async function NextNext() {
  // useEffect(() => {
  //   // eslint-disable-next-line no-console
  //   console.log(process.env.NEXT_PUBLIC_BASE_URL);
  // }, []);

  const todoList = await getTodoData();
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

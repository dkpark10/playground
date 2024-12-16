import { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { QueryClient } from '@tanstack/react-query';
import { nextFetchClient } from '@/utils/next-fetch-client';
import { Todo } from '@/schema/todo';
import TodoItem from '@/components/todo/item';
import TodoInput from '@/components/todo/input';
import { TODO_SERVER_TAG } from '@/constants';

const getTodoData = async (): Promise<Array<Todo>> => {
  const res = await nextFetchClient.get<Array<Todo>>('/api/todo', {
    next: { tags: [TODO_SERVER_TAG] },
  });

  return res;
};

export default async function NextNext() {
  const todoList = await getTodoData();

  const queryClient = new QueryClient();

  queryClient.setQueryData(['todo'], todoList);

  return (
    <>
      <Toaster />

      <Link href="/ssg">
        <header className="text-center text-2xl py-2">Next Next</header>
      </Link>

      <main>
        <TodoInput />

        {todoList.map((todo) => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </main>
    </>
  );
}

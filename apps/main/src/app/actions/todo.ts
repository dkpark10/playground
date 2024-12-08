'use server';

import { revalidateTag } from 'next/cache';
import { Todo } from '@/schema/todo';
import { nextFetchClient } from '@/utils/next-fetch-client';
import { TODO_SERVER_TAG } from '@/constants';

export async function createTodo(todo: Todo) {
  await nextFetchClient.post('/api/todo', {
    body: JSON.stringify(todo),
  });
  revalidateTag(TODO_SERVER_TAG);
}

export async function deleteTodo(todoId: Todo['id']) {
  await nextFetchClient.delete('/api/todo', {
    body: JSON.stringify(todoId),
  });
  revalidateTag(TODO_SERVER_TAG);
}

export async function updateTodo(todo: Todo) {
  await nextFetchClient.put('/api/todo', {
    body: JSON.stringify({
      ...todo,
    }),
  });
  revalidateTag(TODO_SERVER_TAG);
}

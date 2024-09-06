import type { Todo } from '@/schema/todo';
import { atom } from 'jotai';

export const showModalAtom = atom(false);

export type TodoItemAtom = {
  id: Todo['id'];
  title: string;
  action: 'delete' | 'update';
};

export const currentTodoItemAtom = atom<TodoItemAtom>({
  id: '',
  title: '',
  action: 'delete',
});

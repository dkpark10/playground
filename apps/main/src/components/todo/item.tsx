'use client';

import { useSetAtom } from 'jotai';
import { showModalAtom, currentTodoItemAtom } from '@/store';
import type { Todo } from '@/schema/todo';
import { useModal } from '@/hooks/use-modal';
import TodoModal from '@/components/todo/modal';

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const setShowModal = useSetAtom(showModalAtom);
  const setCurrentTodoItem = useSetAtom(currentTodoItemAtom);

  const { open, close } = useModal();

  const onClickShowModal = (action: 'update' | 'delete') => () => {
    setShowModal(true);
    setCurrentTodoItem({
      id: todo.id,
      title: todo.title,
      action,
    });
  };

  return (
    <div className="flex p-2 gap-1 justify-between shadow-md w-full" key={todo.id}>
      <div className="flex items-center">
        <div className="px-1">
          <p className="flex items-center overflow-hidden text-ellipsis h-8 w-64 whitespace-nowrap">
            {todo.title}
          </p>
        </div>
      </div>

      <div className="flex gap-1">
        <button
          type="button"
          className="bg-teal-300 rounded-md w-9 shadow-lg text-white"
          onClick={() => open(<TodoModal />)}
        >
          수정
        </button>
        <button
          type="button"
          className="bg-red-600 rounded-md w-9 shadow-lg text-white"
          onClick={() => open(<TodoModal />)}
        >
          삭제
        </button>
      </div>
    </div>
  );
}

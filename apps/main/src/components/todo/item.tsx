'use client';

import { useModal } from '@/hooks/use-modal';
import { TodoModals } from '@/components/todo/modal';
import type { Todo } from '@/schema/todo';

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const modal = useModal();

  return (
    <div className="flex p-2 gap-1 justify-between shadow-md w-full" key={todo.id}>
      <div className="flex items-center">
        <div className="px-1">
          <p className="flex items-center overflow-hidden text-ellipsis h-8 whitespace-nowrap">
            {todo.title}
          </p>
        </div>
      </div>

      <div className="flex gap-1">
        <button
          type="button"
          className="bg-teal-300 rounded-md w-9 shadow-lg text-white"
          onClick={() => {
            modal.open(({ close }) => <TodoModals.update todo={todo} close={close} />)
          }}
        >
          수정
        </button>
        <button
          onClick={() => {
            modal.open(({ close }) => <TodoModals.delete todo={todo} close={close} />)
          }}
          type="button"
          className="bg-red-600 rounded-md w-9 shadow-lg text-white"
        >
          삭제
        </button>
      </div>
    </div>
  );
}

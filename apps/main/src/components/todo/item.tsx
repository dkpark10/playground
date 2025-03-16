'use client';

/* eslint-disable react/no-unstable-nested-components */

import { useRef } from 'react';
import { useModal } from '@/hooks/use-modal';
import { TodoModals } from '@/components/todo/modal';
import type { Todo } from '@/schema/todo';

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { open, close } = useModal();

  const elementRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex p-2 gap-1 justify-between shadow-md w-full" key={todo.id}>
      <div className="flex items-center">
        <div className="px-1">
          <p className="flex items-center overflow-hidden text-ellipsis h-8 whitespace-nowrap">
            {todo.title}
          </p>
        </div>
      </div>

      <div className="flex gap-1" ref={elementRef}>
        <button
          type="button"
          className="bg-teal-300 rounded-md w-9 shadow-lg text-white"
          onClick={() => {
            open(({ visible }) => <TodoModals.Update visible={visible} todo={todo} close={close} />, {
              center: true,
            });
          }}
        >
          수정
        </button>
        <button
          onClick={() => {
            open(({ visible }) => <TodoModals.Delete visible={visible} todo={todo} close={close} />, {
              center: true,
            });
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

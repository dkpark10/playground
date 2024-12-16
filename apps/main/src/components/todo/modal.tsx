'use client';

import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { deleteTodo, updateTodo } from '@/app/actions/todo';
import type { Todo } from '@/schema/todo';

interface ModalProps {
  todo: Todo;
  close: () => void;
  visible: boolean;
}

function UpdateTodoModal({ todo, close, visible }: ModalProps) {
  const [todoTitle, setTodoTitle] = useState(todo.title);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  };

  const onEditConfirm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateTodo({
      title: todoTitle,
      id: todo.id,
      isCompleted: false,
    })
      .then(() => {
        toast.success('투두 업데이트 성공');
        close();
      })
      .catch(() => {
        toast.error('에러 실패');
      });
  };

  return (
    <form
      className={`${visible ? 'animate-fade-in' : 'animate-fade-out'} shadow-xl p-6 w-[360px] rounded absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
      onSubmit={onEditConfirm}
    >
      <input
        value={todoTitle}
        onChange={onChange}
        className="px-2 rounded w-full h-8 border border-slate-400"
        type="text"
      />
      <div className="flex justify-between">
        <button type="submit" className="bg-indigo-700 text-white mt-4 h-8 rounded-md w-full">
          수정
        </button>
        <button onClick={close} type="button" className="mt-4 h-8 rounded-md w-full">
          닫기
        </button>
      </div>
    </form>
  );
}

function DeleteTodoModal({ todo, close, visible }: ModalProps) {
  const onDeleteConfirm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    deleteTodo(todo.id)
      .then(() => {
        toast.success('투두 삭제 성공');
        close();
      })
      .catch(() => {
        toast.error('에러 실패');
      });
  };

  return (
    <form
      className={`${visible ? 'animate-fade-in' : 'animate-fade-out'} shadow-xl p-6 w-[360px] rounded absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
      onSubmit={onDeleteConfirm}
    >
      <div className="text-center">해당 할일을 삭제 ?</div>
      <div className="flex justify-between">
        <button type="submit" className="bg-red-600 text-white mt-4 h-8 rounded-md w-full">
          삭제
        </button>
        <button onClick={close} type="button" className="mt-4 h-8 rounded-md w-full">
          닫기
        </button>
      </div>
    </form>
  );
}

export const TodoModals = {
  Update: UpdateTodoModal,
  Delete: DeleteTodoModal,
};

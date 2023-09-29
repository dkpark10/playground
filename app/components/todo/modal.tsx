"use client";

import React from "react";
import { showModalAtom, currentTodoItemAtom } from "@/store";
import { useAtom } from "jotai";
import ModalContainer from "@/components/modal-container";
import { deleteTodo, updateTodo } from "@/actions/todo";

export default function TodoModal() {
  const [showModal, setShowModal] = useAtom(showModalAtom);
  const [currentTodoItem, setCurrentTodoItem] = useAtom(currentTodoItemAtom);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTodoItem((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const onEditConfirm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowModal(false);
    updateTodo({
      title: currentTodoItem?.title,
      id: currentTodoItem.id,
      isCompleted: false,
    });
  };

  const onDeleteConfirm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowModal(false);
    deleteTodo(currentTodoItem.id);
  };

  const onCancel = () => {
    setShowModal(false);
  };

  if (showModal && currentTodoItem?.action === "update") {
    return (
      <ModalContainer>
        <form onSubmit={onEditConfirm}>
          <input
            value={currentTodoItem.title}
            onChange={onChange}
            className="rounded px-0.5 w-full h-8 border border-slate-400"
            type="text"
          />
          <div className="flex justify-between">
            <button type="submit" className="bg-indigo-700 text-white mt-4 h-8 rounded-md w-full">
              수정
            </button>
            <button onClick={onCancel} type="button" className="mt-4 h-8 rounded-md w-full">
              닫기
            </button>
          </div>
        </form>
      </ModalContainer>
    );
  }

  if (showModal && currentTodoItem?.action === "delete") {
    return (
      <ModalContainer>
        <form onSubmit={onDeleteConfirm}>
          <div className="text-center">해당 할일을 삭제 ?</div>
          <div className="flex justify-between">
            <button type="submit" className="bg-red-600 text-white mt-4 h-8 rounded-md w-full">
              삭제
            </button>
            <button onClick={onCancel} type="button" className="mt-4 h-8 rounded-md w-full">
              닫기
            </button>
          </div>
        </form>
      </ModalContainer>
    );
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
}

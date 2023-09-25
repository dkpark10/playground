"use client";

import { type TodoItemAtom, showModalAtom, currentTodoItemAtom } from "@/store";
import { useAtom, useAtomValue } from "jotai";
import ModalContainer from "@/components/modal-container";
import { useUpdateTodo } from "@/hooks/use-update-todo";
import { useDeleteTodo } from "@/hooks/use-delete-todo";
import React, { useState } from "react";

export default function TodoModal() {
  const [showModal, setShowModal] = useAtom(showModalAtom);
  const currentTodoItem = useAtomValue(currentTodoItemAtom);
  const [titleValue, setTItleValue] = useState(currentTodoItem?.title || "");

  const { mutate: updateMutate } = useUpdateTodo();
  const { mutate: deleteMutate } = useDeleteTodo();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTItleValue(e.target.value);
  };

  const onEditConfirm = () => {
    setShowModal(false);
    updateMutate({
      title: titleValue,
      id: (currentTodoItem as TodoItemAtom).id,
      isCompleted: false,
    });
  };

  const onDeleteConfirm = () => {
    setShowModal(false);
    deleteMutate((currentTodoItem as TodoItemAtom).id);
  };

  const onCancel = () => {
    setShowModal(false);
  };

  if (showModal && currentTodoItem?.action === "update") {
    return (
      <ModalContainer>
        <input
          value={titleValue}
          onChange={onChange}
          className="rounded px-0.5 w-full h-8 border border-slate-400"
          type="text"
        />
        <div className="flex justify-between">
          <button onClick={onEditConfirm} type="button" className="bg-indigo-700 text-white mt-4 h-8 rounded-md w-full">
            수정
          </button>
          <button onClick={onCancel} type="button" className="mt-4 h-8 rounded-md w-full">
            닫기
          </button>
        </div>
      </ModalContainer>
    );
  }

  if (showModal && currentTodoItem?.action === "delete") {
    return (
      <ModalContainer>
        <div className="text-center">해당 할일을 삭제 ?</div>
        <div className="flex justify-between">
          <button onClick={onDeleteConfirm} type="button" className="bg-red-600 text-white mt-4 h-8 rounded-md w-full">
            삭제
          </button>
          <button onClick={onCancel} type="button" className="mt-4 h-8 rounded-md w-full">
            닫기
          </button>
        </div>
      </ModalContainer>
    );
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
}

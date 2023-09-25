import React from "react";

interface EditTodoModalContentProps {
  onCloseModal: () => void;
  todoTitle: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
}

export default function EditTodoModalContent({
  onCloseModal,
  todoTitle,
  onChange,
  onCancel,
}: EditTodoModalContentProps) {
  return (
    <>
      <input
        value={todoTitle}
        onChange={onChange}
        className="rounded px-0.5 w-full h-8 border border-slate-400"
        type="text"
      />
      <div className="flex justify-between">
        <button onClick={onCloseModal} type="button" className="bg-indigo-700 text-white mt-4 h-8 rounded-md w-full">
          수정
        </button>
        <button onClick={onCancel} type="button" className="mt-4 h-8 rounded-md w-full">
          닫기
        </button>
      </div>
    </>
  );
}

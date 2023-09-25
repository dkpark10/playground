import React from "react";

interface EditTodoModalContentProps {
  onCloseModal: () => void;
  onCancel: () => void;
}

export default function DeleteTodoModalContent({ onCloseModal, onCancel }: EditTodoModalContentProps) {
  return (
    <>
      <div className="text-center">해당 할일을 삭제 ?</div>
      <div className="flex justify-between">
        <button onClick={onCloseModal} type="button" className="bg-red-600 text-white mt-4 h-8 rounded-md w-full">
          삭제
        </button>
        <button onClick={onCancel} type="button" className="mt-4 h-8 rounded-md w-full">
          닫기
        </button>
      </div>
    </>
  );
}

"use client";

import { useRef } from "react";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { createTodo } from "@/app/actions/todo";

export default function TodoInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current || !inputRef.current.value) return;
    createTodo({
      title: inputRef.current?.value,
      isCompleted: false,
      id: uuidv4(),
    })
      .then(() => {
        toast.success("투두 생성 성공");
        (inputRef.current as HTMLInputElement).value = "";
      })
      .catch(() => {
        toast.error("투두 생성 에러");
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex justify-center p-4 gap-2 w-full">
        <input className="outline-none rounded px-0.5 shadow-md w-full h-8" tabIndex={0} type="text" ref={inputRef} />
        <button type="submit" className="bg-indigo-700 rounded-md w-12 shadow-lg text-white">
          추가
        </button>
      </div>
    </form>
  );
}

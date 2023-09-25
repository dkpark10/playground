import type { GetServerSideProps } from "next";
import Head from "next/head";
// import React, { useEffect, useRef, useState } from "react";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { Todo } from "@/schema/todo";
import { getTodo } from "@/services";
import ModalContainer from "@/components/modal";
import EditModalContent from "@/components/modal-content-update";
import DeleteModalContent from "@/components/modal-content-delete";
import { useUpdateTodo } from "@/hooks/use-update-todo";
import { useCreateTodo } from "@/hooks/use-create-todo";
import { useDeleteTodo } from "@/hooks/use-delete-todo";
import { fetchClient } from "@/utils";

const getTodoData = () => {
  return fetchClient.get<Array<Todo>>("api/todo");
};

export default async function NextNext() {
  // const inputRef = useRef<HTMLInputElement>(null);
  // const [showModal, setShowModal] = useState(false);
  // const [inputValue, setInputValue] = useState("");
  // const [currentTodoItem, setCurrentTodoItem] = useState<{
  //   id: Todo["id"];
  //   action: "delete" | "update";
  // } | null>(null);

  // const { data: todoList } = useQuery(["todo"], getTodo, {
  //   staleTime: Infinity,
  // });

  // const { mutate: createMutate } = useCreateTodo();
  // const { mutate: updateMutate } = useUpdateTodo();
  // const { mutate: deleteMutate } = useDeleteTodo();

  // const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (!inputRef.current || !inputRef.current.value) return;
  //   createMutate({
  //     title: inputRef.current?.value,
  //     isCompleted: false,
  //     id: uuidv4(),
  //   });
  // };

  // const onClickEditShowModal = (todoId: Todo["id"]) => () => {
  //   setShowModal(true);
  //   setCurrentTodoItem({
  //     id: todoId,
  //     action: "update",
  //   });
  //   setInputValue(todoList?.find((todoItem) => todoItem.id === todoId)?.title || "");
  // };

  // const onClickDeleteShowModal = (todoId: Todo["id"]) => () => {
  //   setShowModal(true);
  //   setCurrentTodoItem({
  //     id: todoId,
  //     action: "delete",
  //   });
  // };

  // useEffect(() => {
  //   // eslint-disable-next-line no-console
  //   console.log(process.env.NEXT_PUBLIC_BASE_URL);
  // }, []);

  const todoList = await getTodoData();
  return (
    <>
      <Toaster />
      {/* {showModal && currentTodoItem?.action === "update" && (
        <ModalContainer>
          <EditModalContent
            todoTitle={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setInputValue(e.target.value);
            }}
            onCancel={() => {
              setShowModal(false);
              setCurrentTodoItem(null);
              setInputValue("");
            }}
            onCloseModal={() => {
              setShowModal(false);
              setCurrentTodoItem(null);
              setInputValue("");

              updateMutate({
                title: inputValue,
                id: currentTodoItem?.id,
                isCompleted: false,
              });
            }}
          />
        </ModalContainer>
      )}

      {showModal && currentTodoItem?.action === "delete" && (
        <ModalContainer>
          <DeleteModalContent
            onCancel={() => {
              setShowModal(false);
              setCurrentTodoItem(null);
            }}
            onCloseModal={() => {
              setShowModal(false);
              setCurrentTodoItem(null);

              deleteMutate(currentTodoItem?.id);
            }}
          />
        </ModalContainer>
      )} */}

      <Link href="/static">
        <header className="text-center text-2xl py-2">Next Next</header>
      </Link>
      <main>
        <form>
          <div className="flex justify-center p-4 gap-2 w-full">
            <input
              className="outline-none rounded px-0.5 shadow-md w-full h-8"
              tabIndex={0}
              type="text"
              // ref={inputRef}
            />
            <button type="submit" className="bg-indigo-700 rounded-md w-12 shadow-lg text-white">
              추가
            </button>
          </div>
        </form>

        {todoList?.data.map((todo) => (
          <div className="flex p-2 gap-1 justify-between shadow-md w-full" key={todo.id}>
            <div className="flex items-center">
              <input type="checkbox" />
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
                // onClick={onClickEditShowModal(todo?.id)}
              >
                수정
              </button>
              <button
                type="button"
                className="bg-red-600 rounded-md w-9 shadow-lg text-white"
                // onClick={onClickDeleteShowModal(todo?.id)}
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </main>
    </>
  );
}

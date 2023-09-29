import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { TodoSchema, Todo } from "@/schema/todo";
import { logger } from "@/utils/logger";

let todoList: Array<Todo> = [
  {
    title: "next 공부하기",
    isCompleted: false,
    id: "d17f5df1-bb8c-4912-9a9b-e829c114237f ",
  },
  {
    title: "react query 공부하기",
    isCompleted: false,
    id: "0adfcd9f-d4ed-4c62-a8e3-ea97cabe5ced ",
  },
  {
    title: "성공하기",
    isCompleted: false,
    id: "526a9c68-25fd-48b2-8d78-87cf2ce3f8c3",
  },
  {
    title: "부동산, 주식, 현금 다합쳐서 500억 이상 벌기",
    isCompleted: false,
    id: "a0d45e10-9bce-40f1-8d6a-0975ff6b0d01",
  },
  {
    title: "불로 불사 하기",
    id: "1641abd5-7da7-4051-9821-77d44c225cd7",
    isCompleted: false,
  },
];

export function GET(request: NextRequest) {
  try {
    return NextResponse.json(TodoSchema.parse(todoList));
  } catch (error: any) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    logger.error(`[api error]: todo - ${error.message}`);
    return NextResponse.json("", { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const newTodo = await request.json();
  todoList = [...todoList, newTodo];
  return NextResponse.json("", { status: 201 });
}

export async function PUT(request: NextRequest) {
  const updatedTodo = (await request.json()) as Todo;
  todoList = todoList.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo));
  return NextResponse.json("", { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const deleteId = (await request.json()) as Todo["id"];
  todoList = todoList.filter((todo) => todo.id !== deleteId);
  return NextResponse.json("", { status: 201 });
}

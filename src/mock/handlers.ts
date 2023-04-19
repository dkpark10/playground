/* eslint-disable import/no-extraneous-dependencies */
import { rest } from "msw";
import { todoList } from "./assets/todo.json";

export const handlers = [
  rest.get(`${process.env.NEXT_PUBLIC_BASE_URL as string}/todo`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ todoList }));
  }),

  rest.post(`${process.env.NEXT_PUBLIC_BASE_URL as string}/todo`, async (req, res, ctx) => {
    const body = await req.json();
    console.log("123", body);

    return res(ctx.status(201), ctx.json({ todoList }));
  }),
];

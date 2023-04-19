/* eslint-disable import/no-extraneous-dependencies */
import { rest } from "msw";

export const handlers = [
  rest.get(`${process.env.BASE_URL}/test`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ content: "123" }));
  }),
];

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const random = Math.floor(Math.random() * 100);
  return res
    .setHeader("Cache-Control", "public, max-age=5")
    .status(200)
    .send({ name: `John Doe ${random}` });
}

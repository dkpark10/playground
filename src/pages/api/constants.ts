// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  constt: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  return res
    .setHeader("Cache-Control", "public, max-age=10")
    .status(200)
    .send({ constt: `John Doe ${12345}` });
}

import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const delay = Number(req.query.id);
  await new Promise((resolve) => setTimeout(resolve, delay));
  return res.status(200).end(String(delay));
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let headers: object = Object.fromEntries(Object.entries(req.headers).sort());
  res.status(200).json(headers);
}
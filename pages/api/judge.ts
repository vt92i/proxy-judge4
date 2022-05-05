// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  req.headers["remote-address"] = req.socket.remoteAddress;
  req.headers["remote-port"] = req.socket.remotePort?.toString();

  let headers: object = Object.fromEntries(Object.entries(req.headers).sort());

  res.status(200).json(headers);
}
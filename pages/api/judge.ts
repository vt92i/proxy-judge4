import Cors from 'cors';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

const cors = Cors({
  methods: ['GET'],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function initMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await initMiddleware(req, res, cors);

  req.headers["remote-address"] = req.socket.remoteAddress;
  req.headers["remote-port"] = req.socket.remotePort?.toString();

  let headers: object = Object.fromEntries(Object.entries(req.headers).sort());

  res.status(200).json(headers);
}

export default handler;
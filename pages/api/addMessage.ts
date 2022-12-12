// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { serverPusher } from '../../pusher';
import redis from '../../redis';
import { IMessage } from '../../types';

type Data = {
  message: IMessage;
};

type ErrorData = {
  body: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data | ErrorData>) {
  if (req.method !== 'POST') {
    res.status(405).json({ body: 'Method not supported' });
    return;
  }

  const { message } = req.body;
  const newMessage = {
    ...message,
    createdAt: Date.now(),
  };

  await redis.hset('messages', message.id, JSON.stringify(newMessage));
  serverPusher.trigger('messages', 'new-message', newMessage);

  res.status(200).json({ message: newMessage });
}

import Pusher from 'pusher';
import ClientPusher from 'pusher-js';

export const serverPusher = new Pusher({
  appId: process.env.PUSHER_SERVER_APP_ID!,
  key: 'd1c8b28bc4556096ff20',
  secret: process.env.PUSHER_SERVER_SECRET!,
  cluster: 'eu',
  useTLS: true,
});

export const clientPusher = new ClientPusher('d1c8b28bc4556096ff20', {
  cluster: 'eu',
  forceTLS: true,
});

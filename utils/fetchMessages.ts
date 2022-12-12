import { IMessage } from '../types';

const fetcher = async () => {
  const res = await fetch('/api/getMessages');
  const data = await res.json();
  const messages: IMessage[] = data.messages;
  return messages;
};

export default fetcher;

'use client';
import React, { FormEvent, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { IMessage } from '../types';
import useSWR from 'swr';
import fetcher from '../utils/fetchMessages';
import { useSession } from 'next-auth/react';

const ChatInput = () => {
  const [input, setInput] = useState('');
  const { data: messages, error, mutate } = useSWR('/api/getMessages', fetcher);
  const { data: session } = useSession();

  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input || !session) return;
    const messageToSend = input;
    setInput('');
    const id = uuid();
    const message: IMessage = {
      id,
      message: messageToSend,
      createdAt: Date.now(),
      userName: session?.user?.name!,
      profilePic: session?.user?.image!,
      email: session?.user?.email!,
    };

    const uploadMessageToUpstash = async () => {
      const data = await fetch('/api/addMessage', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ message }),
      }).then((res) => res.json());
      if (messages) return [data.message, ...messages];
    };
    if (messages)
      await mutate(uploadMessageToUpstash, {
        optimisticData: [message, ...messages],
        rollbackOnError: true,
      });
  };
  return (
    <div className='flex justify-center items-center'>
      {session && (
        <form onSubmit={addMessage} className='fixed bottom-0 h-12 space-x-2'>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='rounded-full bg-slate-200 h-8 placeholder:p-3'
            type='text'
            placeholder='message...'
            disabled={!session}
          />
          <button
            disabled={!input}
            className='bg-slate-400 disabled:opacity-40 rounded-full p-0.5'
            type='submit'
          >
            send
          </button>
        </form>
      )}
    </div>
  );
};

export default ChatInput;

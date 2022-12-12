'use client';
import React, { useEffect } from 'react';
import useSWR from 'swr';
import { clientPusher } from '../pusher';
import { IMessage } from '../types';
import fetcher from '../utils/fetchMessages';
import Message from './Message';
import { useSession } from 'next-auth/react';

type Props = {
  initialMessages: IMessage[];
};

const MessageList = ({ initialMessages }: Props) => {
  const { data: session } = useSession();
  const { data: messages, error, mutate } = useSWR<IMessage[]>('/api/getMessages', fetcher);
  useEffect(() => {
    const channel = clientPusher.subscribe('messages');
    channel.bind('new-message', async (data: IMessage) => {
      if (messages?.find((message) => message.id === data.id)) return;
      if (!messages) {
        mutate(fetcher);
      } else {
        mutate(fetcher, {
          optimisticData: [data, ...messages],
          rollbackOnError: true,
        });
      }
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages, mutate]);

  return (
    <div className='max-w-2xl space-y-5 px-5 xl:max-w-4xl pb-32 '>
      {session && (messages || initialMessages).map((message) => (
        <Message key={message.id} message={message}></Message>
      ))}
    </div>
  );
};

export default MessageList;

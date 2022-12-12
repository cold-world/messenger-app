import { unstable_getServerSession } from 'next-auth';
import React from 'react';
import { IMessage } from '../types';
import ChatInput from './ChatInput';
import MessageList from './MessageList';
import { Providers } from './providers';

const page = async () => {
  const session = await unstable_getServerSession();
  const data = await fetch(
    `${process.env.VERSEL_URL || 'http://localhost:3000'}/api/getMessages`
  ).then((res) => res.json());
  const messages: IMessage[] = data.messages;
  return (
    <Providers session={session}>
      <main>
        <MessageList initialMessages={messages} />
        <ChatInput />
      </main>
    </Providers>
  );
};

export default page;

import React from 'react';
import { IMessage } from '../types';
import { useSession } from 'next-auth/react';
import TimeAgo from 'react-timeago';

type Props = {
  message: IMessage;
};

const Message = ({ message }: Props) => {
  const { data: session } = useSession();
  const isUser = session?.user?.email === message.email;

  return (
    <div className={`flex flex-col w-fit max-w-sm ${isUser && 'ml-auto'}`}>
      <div className='bg-orange-300 mb-3'>
        <p>{message.message}</p>
      </div>
      <div>
        <p>{message.userName}</p>
      </div>
      <div>
        <TimeAgo date={new Date(message.createdAt)} />
      </div>
    </div>
  );
};

export default Message;

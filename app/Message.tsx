import React from 'react';
import { IMessage } from '../types';
import { useSession } from 'next-auth/react';
import TimeAgo from 'react-timeago';
import Image from 'next/image';

type Props = {
  message: IMessage;
};

const Message = ({ message }: Props) => {
  const { data: session } = useSession();
  const isUser = session?.user?.email === message.email;

  return (
    <div className={`flex flex-col w-fit max-w-sm ${isUser ? 'ml-auto' : 'mx-auto'}`}>
      <div>
        <Image
          className='rounded-full'
          src={message.profilePic}
          alt='userpic'
          width={50}
          height={50}
        />
        <p className='bg-slate-200 mb-3 rounded-full'>{message.message}</p>
      </div>
      <div>
        <p>{message.userName}</p>
      </div>
      <div>
        <TimeAgo className='text-sm text-gray-400' date={new Date(message.createdAt)} />
      </div>
    </div>
  );
};

export default Message;

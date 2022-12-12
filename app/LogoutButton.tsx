'use client';
import React from 'react';
import { signOut } from 'next-auth/react';

type Props = {};

const LogoutButton = (props: Props) => {
  return (
    <button onClick={() => signOut()} className='text-sm py-0.5 px-2 bg-blue-500 rounded-full text-white w-20'>
      Sign Out
    </button>
  );
};

export default LogoutButton;

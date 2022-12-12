'use client';
import React from 'react';
import { signOut } from 'next-auth/react';

type Props = {};

const LogoutButton = (props: Props) => {
  return (
    <button onClick={() => signOut()} className='bg-slate-400'>
      Sign Out
    </button>
  );
};

export default LogoutButton;

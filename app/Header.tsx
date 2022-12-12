import React from 'react';
import Image from 'next/image';
import Logo from '../public/logo-Meta.png';
import Link from 'next/link';
import LogoutButton from './LogoutButton';
import { unstable_getServerSession } from 'next-auth/next';

type Props = {
  session: Awaited<ReturnType<typeof unstable_getServerSession>>;
};

const Header = ({ session }: any) => {
  if (session)
    return (
      <header>
        <div className='flex flex-col space-x-2 space-y-5 mt-10 ml-10'>
          <div>
            <Image className='rounded-full' width={50} height={50} alt='userpic' src={session.user?.image} />
            <p className='space-y-5'>Logged as: {session.user?.name}</p>
          </div>
          <LogoutButton />
        </div>
      </header>
    );
  return (
    <header>
      <div className='flex flex-col space-x-2 items-center space-y-5'>
        <div className='flex space-x-5 py-5'>
          <Image height={50} width={50} alt='logo' src={Logo} />
          <p>Welcome to messenger</p>
        </div>
        <Link className='text-xl py-1 px-2 bg-blue-500 rounded-full text-white' href='/auth/signin'>
          Sign in
        </Link>
      </div>
    </header>
  );
};

export default Header;

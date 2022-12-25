'use client';
import { getProviders, signIn } from 'next-auth/react';

type Props = {
  providers: Awaited<ReturnType<typeof getProviders>>;
};

const SignInComponent = ({ providers }: Props) => {
  return (
    <div>
      {Object.values(providers!).map((provider) => (
        <div className='flex flex-col items-center m-auto text-center mt-5' key={provider.name}>
          <button
            className='text-xl py-1 px-2 bg-blue-500 rounded-full text-white'
            onClick={() => {
              signIn(provider.id, {
                callbackUrl: process.env.VERCEL_URL,
              });
            }}
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SignInComponent;

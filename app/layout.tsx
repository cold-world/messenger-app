import { unstable_getServerSession } from 'next-auth/next';
import '../styles/globals.css';
import Header from './Header';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await unstable_getServerSession();

  return (
    <html>
      <head />
      <body>
        <Header session={session} />
        {children}
      </body>
    </html>
  );
}

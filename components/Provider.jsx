'use client';

import { SessionProvider } from 'next-auth/react';
//for authentication
const Provider = ( { children, session }) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider;

'use client'

import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import {  useSession } from 'next-auth/react';


const Home=  () => {
  const session = useSession();

  if (!session) {
    redirect("/login")
  }
  return <></>;
};

export default Home;

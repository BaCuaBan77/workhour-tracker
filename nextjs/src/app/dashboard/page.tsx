'use client';
import { SystemUserPrivilege } from '@/types';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react';

const Dashboard = () => {
  const session = useSession()
  console.log(session);
  if (!session.data) {
    redirect( "/login")
  }
  let role =SystemUserPrivilege.EMPLOYEE;
  if (session.data.roles.includes(SystemUserPrivilege.EMPLOYER)) {
    role = SystemUserPrivilege.EMPLOYER;
  }
  return (
    <div>
      <h1>Main page for {role}</h1>
    </div>
  );
};

export default Dashboard;
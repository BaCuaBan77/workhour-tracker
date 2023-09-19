'use client';
import { useAuth } from '@/context/AuthContext';
import { SystemUserPrivilege } from '@/types';
import { useRouter } from 'next/navigation';
import React from 'react';
import styles from '@/styles/login.module.css';

const Dashboard = () => {
  const { push } = useRouter();
  const { user, logout } = useAuth();
  React.useEffect(() => {
    if (!user) {
      push('/login');
    }
  }, [user, push]);

  let role = SystemUserPrivilege.EMPLOYEE;
  if (
    user?.resource_access.workhour.roles.includes(SystemUserPrivilege.EMPLOYER)
  ) {
    role = SystemUserPrivilege.EMPLOYER;
  }
  return (
    <div>
      <h1>Main page for {role}</h1>
      <button className={styles.button} type='submit' onClick={logout}>
        Sign Out
      </button>
    </div>
  );
};

export default Dashboard;

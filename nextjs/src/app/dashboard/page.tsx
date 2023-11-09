'use client'
import { useAuth } from '@/context/AuthContext'
import { SystemUserPrivilege } from '@/types'
import { useRouter } from 'next/navigation'
import React from 'react'
import styles from '@/styles/login.module.css'
import EmployerView from '@/components/EmployerView'
import EmployeeView from '@/components/EmployeeView'

const Dashboard = () => {
  const { push } = useRouter()
  const { user, logout } = useAuth()
  React.useEffect(() => {
    if (!user) {
      push('/login')
    }
  }, [user, push])

  let role = SystemUserPrivilege.EMPLOYEE
  if (
    user?.resource_access.workhour.roles.includes(SystemUserPrivilege.EMPLOYER)
  ) {
    role = SystemUserPrivilege.EMPLOYER
  }
  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.viewTitle}>
          {role === SystemUserPrivilege.EMPLOYER
            ? 'Employer View'
            : 'Employee View'}
        </h1>
        <div className={styles.loggedOutDiv}>
          <p className={styles.username}>{user?.name}</p>
          <button className={styles.signOutButton} onClick={logout}>
            Sign Out
          </button>
        </div>
      </header>
      {role === SystemUserPrivilege.EMPLOYER ? (
        <EmployerView />
      ) : (
        <EmployeeView />
      )}
    </div>
  )
}

export default Dashboard

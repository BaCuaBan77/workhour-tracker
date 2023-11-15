import { useAuth } from '@/context/AuthContext'
import { FullUserDTO, WorkHourDTO } from '@/types'
import { env } from 'process'
import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import CircularButton from './CircularButton'
import { format } from 'date-fns'
import styles from '@/styles/employeeview.module.css'

function EmployeeView() {
  const { user } = useAuth()
  const [dbUser, setDbUser] = useState<FullUserDTO | undefined>(undefined)
  useEffect(() => {
    // Fetch the list of users from your database API and update the state
    // Replace the URL with your actual API endpoint
    fetch(`/api/user?username=${user?.preferred_username}`)
      .then((response) => response.json())
      .then((data) => setDbUser(data))
      .catch((error) => console.error(error))
  }, [user])

  if (!dbUser) {
    console.error('No users was found in the database')
    return
  }
  const currentDate = new Date()

  const onClick = () => {
    const newDbUser: FullUserDTO = { ...dbUser }
    newDbUser.workHours = undefined
    if (dbUser.isWorking && dbUser.startAt) {
      newDbUser.isWorking = false
      newDbUser.startAt = null
      const newWorkHour: WorkHourDTO = {
        startTime: dbUser.startAt,
        endTime: currentDate,
        userId: dbUser.id,
        date: format(currentDate, 'yyyy-MM-dd HH:mm:ss'),
      }
      fetch('/api/workhour', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newWorkHour),
      })
    } else {
      newDbUser.startAt = currentDate
      newDbUser.isWorking = true
    }
    setDbUser(newDbUser)
    fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDbUser),
    })
  }
  return (
    <div className={styles.container}>
      <p className={styles.name}>{dbUser?.name}</p>
      <p className={styles.startedAt}>
        Started At{' '}
        {dbUser.startAt
          ? format(new Date(dbUser.startAt), 'HH:mm:ss dd-MM-yyyy')
          : 'Not Started'}
      </p>
      <CircularButton
        onClick={onClick}
        text={dbUser.isWorking ? 'Stop Working' : 'Start Working'}
      />
    </div>
  )
}

export default EmployeeView

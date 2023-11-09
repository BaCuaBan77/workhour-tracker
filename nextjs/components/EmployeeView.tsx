import { useAuth } from '@/context/AuthContext'
import { FullUserDTO } from '@/types'
import { env } from 'process'
import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import CircularButton from './CircularButton'

interface WorkHoursData {
  [date: string]: number
}

function EmployeeView() {
  const [date, setDate] = useState<Date>(new Date())
  const { user } = useAuth()
  const [workHoursData, setWorkHoursData] = useState<WorkHoursData>({})
  const [dbUser, setDbUser] = useState<FullUserDTO | undefined>(undefined)
  const [selectedUser, setSelectedUser] = useState<FullUserDTO | undefined>()
  useEffect(() => {
    // Fetch the list of users from your database API and update the state
    // Replace the URL with your actual API endpoint
    fetch(`/api/user?username=${user?.preferred_username}`)
      .then((response) => response.json())
      .then((data) => setDbUser(data))
      .catch((error) => console.error(error))
  }, [])

  const currentDate = new Date()

  return (
    <div>
      <p>{dbUser?.name}</p>
      <CircularButton />
    </div>
  )
}

export default EmployeeView

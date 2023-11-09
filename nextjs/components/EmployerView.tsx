
import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import Select from 'react-select'
import 'react-calendar/dist/Calendar.css'
import { FullUserDTO } from '@/types'
import styles from '@/styles/employerview.module.css'
import { areDatesEqual } from '@/src/util/utils'
function EmployerView() {
  const [date, setDate] = useState<Date>(new Date())
  const [users, setUsers] = useState<FullUserDTO[]>([])
  const [selectedUser, setSelectedUser] = useState<FullUserDTO | undefined>()

  useEffect(() => {
    // Fetch the list of users from your database API and update the state
    // Replace the URL with your actual API endpoint
    fetch('/api/user')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error))
  }, [])

  const getWorkHoursForDate = (date: Date) => {
    const workhour = selectedUser?.workHours.find((h) =>
      areDatesEqual(date, h.startTime)
    )
    return workhour?.duration || 0

  }

  const customDayTileContent = ({
    date,
    view,
  }: {
    date: Date
    view: string
  }) => {
    const hours = getWorkHoursForDate(date)
    return <div>{view === 'month' && <p>Work Hours: {hours}</p>}</div>
  }


  const filteredUsers = users.map((user) => ({
    value: user.id,
    label: user.name,
  }))

  return (
    <div className={styles.employerView}>
      <Select
        className={styles.userSelect}
        value={{
          value: selectedUser?.id,
          label: selectedUser?.name,
        }}
        onChange={(change) => {
          const user = users.find((u) => u.name === change?.label)
          setSelectedUser(user)
        }}
        options={filteredUsers}
        placeholder='Select a User'
        isSearchable
      />
      <Calendar
        className={styles.calendar}

        onChange={(value, event) => {
          setDate(new Date(value?.toString()!))
        }}
        value={date}
        tileContent={customDayTileContent}
      />
    </div>
  )
}

export default EmployerView

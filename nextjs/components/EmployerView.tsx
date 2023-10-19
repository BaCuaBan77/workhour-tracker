import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

interface WorkHoursData {
  [date: string]: number
}

function EmployerView() {
  const [date, setDate] = useState<Date>(new Date())
  const [workHoursData, setWorkHoursData] = useState<WorkHoursData>({})

  const handleDateChange = (
    newDate: Date | Date[],
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (Array.isArray(newDate)) {
      // Handle multiple date selection if needed
    } else {
      setDate(newDate)
    }
  }

  const setWorkHoursForDate = (date: Date, hours: number) => {
    const updatedData: WorkHoursData = {
      ...workHoursData,
      [date.toDateString()]: hours,
    }
    setWorkHoursData(updatedData)
  }

  const getWorkHoursForDate = (date: Date) => {
    return workHoursData[date.toDateString()] || 0
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

  return (
    <div>
      <h1>Calendar View</h1>
      <Calendar
        onChange={(value, event) => {
          setDate(new Date(value?.toString()!))
        }}
        value={date}
        tileContent={customDayTileContent}
      />
      <div>Selected Date: {date.toDateString()}</div>
      <div>
        <label htmlFor='workHoursInput'>Enter Work Hours:</label>
        <input
          id='workHoursInput'
          type='number'
          value={getWorkHoursForDate(date)}
          onChange={(e) =>
            setWorkHoursForDate(date, parseInt(e.target.value, 10))
          }
        />
      </div>
    </div>
  )
}

export default EmployerView

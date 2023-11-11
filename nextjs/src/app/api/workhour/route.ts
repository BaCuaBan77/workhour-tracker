import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'
import { WorkHour } from '@prisma/client'
import { WorkHourDTO } from '@/types'
import { calculateDuration } from '@/src/util/utils'

export async function GET(req: Request) {
  const workHours = await prisma.workHour.findMany({
    include: {
      user: true,
    },
  })
  return NextResponse.json(workHours)
}

export async function POST(req: Request) {
  const dto: WorkHourDTO = await req.json()
  const workhourID = dto.date + dto.userId
  const startTime = new Date(dto.startTime)
  const endTime = new Date(dto.endTime)
  if (!(startTime instanceof Date) || !(endTime instanceof Date)) {
    return
  }
  const newWorkHour: WorkHour = {
    id: workhourID,
    startTime: startTime,
    endTime: endTime,
    duration: calculateDuration(startTime, endTime),
    userId: dto.userId,
  }

  const workHour = await prisma.workHour.upsert({
    where: { id: workhourID },
    update: { ...newWorkHour },
    create: { ...newWorkHour },
  })
  return NextResponse.json(workHour)
}

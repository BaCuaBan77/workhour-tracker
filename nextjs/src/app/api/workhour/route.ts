import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'
import { WorkHour } from '@prisma/client'
import { WorkHourDTO } from '@/types'
import { calculateDurationInHours } from '@/src/util/utils'

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

  const newWorkHour: WorkHour = {
    id: workhourID,
    startTime: dto.startTime,
    endTime: dto.endTime,
    duration: calculateDurationInHours(dto.startTime, dto.endTime),
    userId: dto.userId,
  }

  const workHour = await prisma.workHour.upsert({
    where: { id: workhourID },
    update: { ...newWorkHour },
    create: { ...newWorkHour },
  })
  return NextResponse.json(workHour)
}

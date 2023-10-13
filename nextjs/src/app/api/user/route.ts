import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'
import { User } from '@prisma/client'

export async function GET(req: Request) {
  const users = await prisma.user.findMany({
    include: {
      workHours: true,
    },
  })
  return NextResponse.json(users)
}

export async function POST(req: Request) {
  const newUser: User = await req.json()

  const user = await prisma.user.upsert({
    where: { username: newUser.username },
    update: { ...newUser },
    create: { ...newUser },
  })
  return NextResponse.json(user)
}

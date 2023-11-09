import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'
import { User } from '@prisma/client'

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get('username')
  if (!username) {
    const users = await prisma.user.findMany({
      include: {
        workHours: true,
      },
    })
    return NextResponse.json(users)
  } else {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
      include: {
        workHours: true,
      },
    })
    return NextResponse.json(user)
  }
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

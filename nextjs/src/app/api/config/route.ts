import { NextRequest, NextResponse } from 'next/server'

export default function GET(req: NextRequest) {
  return NextResponse.json({ API: process.env.NEXT_PUBLIC_SERVER_IP })
}

'use client'
import { SessionProvider } from "next-auth/react"
import React from "react"


    
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <SessionProvider>
        {children}
      </SessionProvider>
        </body>
    </html>
  )
}

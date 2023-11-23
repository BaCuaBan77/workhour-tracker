'use client'

import { AuthProvider } from '@/context/AuthContext'
import React from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  fetch('api/config', { method: `GET` }).then(async (response) => {
    if (response.ok) {
      const data = await response.json()
      localStorage.setItem('API', data.API)
    }
  })
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}

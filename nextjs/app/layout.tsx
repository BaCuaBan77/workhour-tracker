import React from "react"

export const metadata = {
  title: 'FrostBite',
  description: 'Simple Work-tracking system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

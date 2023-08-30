import './globals.css'
import type { Metadata } from 'next'
import { Maven_Pro } from 'next/font/google'

const mavenPro = Maven_Pro({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MoodPulse',
  description: 'Your daily mood partner',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={mavenPro.className}>{children}</body>
    </html>
  )
}

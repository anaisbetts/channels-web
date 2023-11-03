import type { Metadata } from 'next'
import { Source_Sans_3 } from 'next/font/google'

import './globals.css'

const sourceSans = Source_Sans_3({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={sourceSans.className}>
        <main className='prose min-h-screen'>{children}</main>
      </body>
    </html>
  )
}

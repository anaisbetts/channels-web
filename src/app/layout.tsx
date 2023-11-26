import type { Metadata } from 'next'
import { Source_Sans_3 } from 'next/font/google'

import { cx } from '@/lib/actions/utility'
import Link from 'next/link'
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
  const bc = cx(
    sourceSans.className,
    'bg-gradient-to-r from-purple-900 to-blue-900 text-white',
    'fixed inset-0',
    'grid grid-rows-[auto,1fr,auto]',
  )

  return (
    <html lang='en'>
      <body className={bc}>
        <nav className='bg-gradient-to-r from-purple-700 to-blue-700'>
          <Link href='/'>
            <h2 className='p-4 text-2xl font-bold'>Channels</h2>
          </Link>
        </nav>

        <main className='overflow-y-auto py-2'>{children}</main>

        <footer className='h-6 bg-gradient-to-r from-purple-700 to-blue-700'></footer>
      </body>
    </html>
  )
}

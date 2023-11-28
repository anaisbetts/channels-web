'use client'

import Image from 'next/image'
import Link from 'next/link'
import { createContext, useState } from 'react'
import { SearchBar } from './SearchBar'

export const SearchContext = createContext('')

export interface ActualLayoutProps {
  children: React.ReactNode
  showSearch?: boolean
}

export default function ActualLayout({
  children,
  showSearch,
}: ActualLayoutProps) {
  const [search, setSearch] = useState('')

  return (
    <SearchContext.Provider value={search}>
      <nav className='flex flex-col items-center bg-gradient-to-r from-purple-700 to-blue-700 sm:flex-row'>
        <Link href='/'>
          <span className='flex flex-row items-center'>
            <Image
              className='mx-2'
              src='/logo-trans.png'
              alt='Channels'
              width={35}
              height={25}
            />
            <h2 className='pt-1 text-2xl font-bold'>Channels</h2>
          </span>
        </Link>

        {showSearch && (
          <search className='flex flex-grow'>
            <SearchBar className='flex-grow' onChange={(e) => setSearch(e)} />
          </search>
        )}
      </nav>

      <main className='overflow-y-auto py-2'>{children}</main>

      <footer className='h-6 bg-gradient-to-r from-purple-700 to-blue-700'></footer>
    </SearchContext.Provider>
  )
}

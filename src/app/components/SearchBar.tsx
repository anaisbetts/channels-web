'use client'

import { i } from '@/lib/logger-client'
import { Movie } from '@/lib/types'
import { matchSorter } from 'match-sorter'
import { useState } from 'react'
import MovieList from './MovieList'

export interface SearchBarProps {
  allMovies: Movie[]
  children: JSX.Element[]
}

export function SearchBar({ allMovies, children }: SearchBarProps) {
  const [search, setSearch] = useState('')

  const isEmpty = (search ?? '').length < 2
  let innerContent = isEmpty ? children : <></>

  if (!isEmpty) {
    const result = matchSorter(allMovies, search, { keys: ['title'] })

    i('Search results', result)
    innerContent = <MovieList movies={result} />
  }

  return (
    <section>
      <div className='flex items-center justify-center'>
        <input
          className='w-1/2 rounded-2xl border-2 border-gray-300 p-2 text-gray-900'
          type='search'
          placeholder='Search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {innerContent}
    </section>
  )
}

'use client'

import { cx } from '@/lib/actions/utility'
import { i } from '@/lib/logger-client'
import { Movie } from '@/lib/types'
import { matchSorter } from 'match-sorter'
import { useContext, useState } from 'react'
import { SearchContext } from './ActualLayout'
import MediaList from './MediaList'

export interface SearchBarProps {
  className?: string
  onChange?: (query: string) => void
}

export interface SearchResultProps {
  allMovies: Movie[]
  query?: string
  children: JSX.Element[]
}

export function SearchBar({ className, onChange }: SearchBarProps) {
  const [search, setSearch] = useState('')
  const c = cx(
    className,
    'mx-8 my-4 max-w-xl rounded-2xl border-2 border-gray-300 text-gray-900',
  )

  return (
    <input
      className={c}
      type='search'
      placeholder='Search'
      value={search}
      onChange={(e) => {
        onChange?.(e.target.value)
        setSearch(e.target.value)
      }}
    />
  )
}

export function SearchResult({
  allMovies,
  query,
  children,
}: SearchResultProps) {
  const sp = useContext(SearchContext)

  const q = query ?? sp ?? ''
  const isEmpty = q.length < 4
  let innerContent = isEmpty ? children : <></>

  if (!isEmpty) {
    const result = matchSorter(allMovies, q, { keys: ['title'] })

    i('Search results', result)
    innerContent = <MediaList media={result} />
  }

  return <>{innerContent}</>
}

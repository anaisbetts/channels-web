'use client'

import { useEffect } from 'react'
import { MovieListProps } from './MovieList'

export function DebugNode({ movies }: MovieListProps) {
  useEffect(() => {
    const wnd = window as any
    wnd.movies = movies

    return () => {}
  })

  return <></>
}

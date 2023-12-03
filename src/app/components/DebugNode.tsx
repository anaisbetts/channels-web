'use client'

import { useEffect } from 'react'
import { MediaListProps } from './MovieList'

export function DebugNode({ movies }: MediaListProps) {
  useEffect(() => {
    const wnd = window as any
    wnd.movies = movies

    return () => {}
  })

  return <></>
}

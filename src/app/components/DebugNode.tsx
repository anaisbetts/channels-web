'use client'

import { useEffect } from 'react'
import { MediaListProps } from './MediaList'

export function DebugNode({ movies }: MediaListProps) {
  useEffect(() => {
    const wnd = window as any
    wnd.movies = movies

    return () => {}
  })

  return <></>
}

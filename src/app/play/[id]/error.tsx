'use client'

import { useEffect } from 'react'

export default function PlayerErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.log(error)
    return () => {}
  }, [error])

  return <h2>A bad happened! {error.message}</h2>
}

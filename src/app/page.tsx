import { fetchMovies, status } from '@/server/api'
import { w } from '@/server/logger'
import { redirect } from 'next/navigation'
import { DebugNode } from './DebugNode'
import MovieList from './MovieList'

export const revalidate = 10 // seconds

export default async function Home() {
  try {
    await status()
  } catch (e) {
    w('Failed to fetch status, redirecting to login')
    w(e)

    redirect('/login')
  }

  const movieList = await fetchMovies()

  return (
    <section className='prose'>
      <DebugNode movies={movieList} />

      <h2 className='px-8 text-5xl'>Movies</h2>
      <MovieList movies={movieList.slice(0, 50)} />
    </section>
  )
}

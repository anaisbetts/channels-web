import { fetchMovies, status } from '@/server/api'
import { redirect } from 'next/navigation'
import MovieList from './MovieList'
import { DebugNode } from './DebugNode'

export default async function Home() {
  try {
    await status()
  } catch (e) {
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

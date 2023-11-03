import { fetchMovies, status } from '@/server/api'
import { redirect } from 'next/navigation'
import MovieList from './MovieList'

export default async function Home() {
  try {
    await status()
  } catch (e) {
    redirect('/login')
  }

  const movieList = await fetchMovies()

  return (
    <>
      <h2 className='px-8 pt-8'>Movies</h2>
      <MovieList movies={movieList.slice(0, 50)} />
    </>
  )
}

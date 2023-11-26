import { fetchMovies, status } from '@/server/api'
import { w } from '@/server/logger'
import { redirect } from 'next/navigation'
import MovieList from './components/MovieList'
import { SearchBar } from './components/SearchBar'

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
    <SearchBar allMovies={movieList}>
      <h2 className='px-8 py-4 text-5xl'>Movies</h2>
      <MovieList movies={movieList.slice(0, 50)} />

      <h2 className='px-8 py-4 text-5xl'>A different List</h2>
      <MovieList movies={movieList.slice(51, 100)} />

      <h2 className='px-8 py-4 text-5xl'>A Third List</h2>
      <MovieList
        movies={movieList.filter((x) => x.title.indexOf('atrix') > 0)}
      />
    </SearchBar>
  )
}

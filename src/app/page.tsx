import { fetchMovies, status } from '@/server/api'
import { w } from '@/server/logger'
import { redirect } from 'next/navigation'
import MovieList from './components/MovieList'
import { SearchBar } from './components/SearchBar'
import {
  groupByGenre,
  sortGenresByPopularity,
} from './components/list-generation'

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

  // Generate some interesting lists
  const genres = groupByGenre(movieList)
  const topFive = sortGenresByPopularity(genres, 3)

  const topFiveMarkup = topFive.map(([genre, movies]) => (
    <section key={genre}>
      <h2 className='px-8 py-4 text-5xl'>{genre}</h2>
      <MovieList movies={movies} />
    </section>
  ))

  return (
    <SearchBar allMovies={movieList}>
      <h2 className='px-8 py-4 text-5xl'>Movies</h2>
      <MovieList movies={movieList.slice(0, 50)} />

      <>{topFiveMarkup}</>
    </SearchBar>
  )
}

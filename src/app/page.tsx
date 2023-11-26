import { Movie } from '@/lib/types'
import { fetchMovies, status } from '@/server/api'
import { w } from '@/server/logger'
import { redirect } from 'next/navigation'
import ActualLayout from './components/ActualLayout'
import MovieList from './components/MovieList'
import { SearchResult } from './components/SearchBar'
import {
  groupByGenre,
  newAndNotable,
  sortGenresByPopularity,
} from './components/list-generation'

export const revalidate = 10 // seconds

interface MovieListWithHeaderProps {
  header: string
  movies: Movie[]
}

function MovieListWithHeader({ header, movies }: MovieListWithHeaderProps) {
  return (
    <section>
      <h2 className='px-8 pb-4 pt-12 text-5xl font-bold'>{header}</h2>
      <MovieList movies={movies} />
    </section>
  )
}

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
    <MovieListWithHeader key={genre} header={genre} movies={movies} />
  ))

  return (
    <ActualLayout>
      <SearchResult allMovies={movieList}>
        <MovieListWithHeader
          header='New and Notable'
          movies={newAndNotable(movieList)}
        />

        <>{topFiveMarkup}</>
      </SearchResult>
    </ActualLayout>
  )
}

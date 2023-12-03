import { Movie } from '@/lib/types'
import { fetchMovies, status } from '@/server/api'
import { w } from '@/server/logger'
import { redirect } from 'next/navigation'
import ActualLayout from './components/ActualLayout'
import MediaList from './components/MovieList'
import { SearchResult } from './components/SearchBar'
import {
  defaultMediaSort,
  groupByGenre,
  newAndNotable,
  sortGenresByPopularity,
} from './components/list-generation'

export const revalidate = 10 // seconds

interface MediaListWithHeaderProps {
  header: string
  movies: Movie[]
}

function MediaListWithHeader({ header, movies }: MediaListWithHeaderProps) {
  return (
    <section>
      <h2 className='px-8 pb-4 pt-12 text-5xl font-bold'>{header}</h2>
      <MediaList movies={movies} />
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
    <MediaListWithHeader
      key={genre}
      header={genre}
      movies={defaultMediaSort(movies)}
    />
  ))

  return (
    <ActualLayout showSearch>
      <SearchResult allMovies={movieList}>
        <MediaListWithHeader
          header='New and Notable'
          movies={newAndNotable(movieList)}
        />

        <>{topFiveMarkup}</>
      </SearchResult>
    </ActualLayout>
  )
}

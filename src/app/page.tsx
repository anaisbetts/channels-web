import { Media } from '@/lib/types'
import { fetchMovies, fetchTVSeries, status } from '@/server/api'
import { w } from '@/server/logger'
import { redirect } from 'next/navigation'
import ActualLayout from './components/ActualLayout'
import MediaList from './components/MediaList'
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
  media: Media[]
}

function MediaListWithHeader({ header, media }: MediaListWithHeaderProps) {
  return (
    <section>
      <h2 className='px-8 pb-4 pt-12 text-5xl font-bold'>{header}</h2>
      <MediaList media={media} />
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

  const [movieList, showList] = await Promise.all([
    fetchMovies(),
    fetchTVSeries(),
  ])

  // Generate some interesting lists
  const genres = groupByGenre([...movieList, ...showList])
  const topFive = sortGenresByPopularity(genres, 3)
  const newAndNotableList = newAndNotable([...movieList, ...showList])

  const topFiveMarkup = topFive.map(([genre, movies]) => (
    <MediaListWithHeader
      key={genre}
      header={genre}
      media={defaultMediaSort(movies)}
    />
  ))

  return (
    <ActualLayout showSearch>
      <SearchResult allMovies={movieList}>
        <MediaListWithHeader
          header='New and Notable'
          media={newAndNotableList}
        />

        <>{topFiveMarkup}</>
      </SearchResult>
    </ActualLayout>
  )
}

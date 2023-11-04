import { Movie } from '@/lib/types'
import { fetchMovies } from '@/server/api'

export type PlayerPageProps = {
  params: { id: string }
}

export default async function PlayerPage({ params }: PlayerPageProps) {
  const movies = await fetchMovies()
  const byId = movies.reduce(
    (acc, x) => {
      acc[x.id] = x
      return acc
    },
    {} as Record<string, Movie>
  )

  const theMovie = byId[params.id]
  return <h2>The movie is {theMovie.title}</h2>
}

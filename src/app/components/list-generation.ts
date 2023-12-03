import { Media, Movie, TVShow, getTitleForMedia } from '@/lib/types'
import orderBy from 'lodash/fp/orderBy'

type HasGenres = Movie | TVShow

export function groupByGenre<T extends HasGenres>(
  movies: T[],
): Record<string, T[]> {
  return movies.reduce(
    (acc, movie) => {
      if (!movie.genres) {
        return acc
      }

      movie.genres.forEach((g) => {
        acc[g] = acc[g] || []
        acc[g].push(movie)
      })

      return acc
    },
    {} as Record<string, T[]>,
  )
}

export function sortGenresByPopularity<T extends HasGenres>(
  genres: Record<string, T[]>,
  count: number,
) {
  return Object.entries(genres)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, count)
}

export function newAndNotableForTime<T extends Media>(
  movies: T[],
  since: number,
): T[] {
  const recentlyWatched = movies
    .filter((x) => (x.last_watched_at ?? 0) >= since)
    .sort((a, b) => (b.last_watched_at ?? 0) - (a.last_watched_at ?? 0))
    .slice(0, 10)

  const recentlyAdded = movies
    .filter((x) => x.created_at >= since)
    .sort((a, b) => b.created_at - a.created_at)
    .slice(0, 30)

  return [...recentlyWatched, ...recentlyAdded]
}

const twoWeeksOfTime = 1000 * 60 * 60 * 24 * 14
export function newAndNotable<T extends Media>(movies: T[]): T[] {
  const ret = newAndNotableForTime(movies, Date.now() - twoWeeksOfTime)

  // If we don't get enough results for two weeks, scale it up to 4
  if (ret.length > 8) return ret
  return newAndNotableForTime(movies, Date.now() - twoWeeksOfTime * 2)
}

export function defaultMediaSort<T extends Media>(movies: T[]): T[] {
  const newMovies = newAndNotable(movies)
  const lookup = newMovies.reduce(
    (acc, movie) => {
      acc[getTitleForMedia(movie)] = true
      return acc
    },
    {} as Record<string, boolean>,
  )

  const restMovies = movies.filter((x) => !lookup[getTitleForMedia(x)])
  return [
    ...newMovies,
    ...orderBy([(x) => getTitleForMedia(x)], ['asc'], restMovies),
  ]
}

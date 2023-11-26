import { Movie } from '@/lib/types'

export function groupByGenre(movies: Movie[]): Record<string, Movie[]> {
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
    {} as Record<string, Movie[]>,
  )
}

export function sortGenresByPopularity(
  genres: Record<string, Movie[]>,
  count: number,
) {
  return Object.entries(genres)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, count)
}

export function newAndNotableForTime(movies: Movie[], since: number): Movie[] {
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
export function newAndNotable(movies: Movie[]): Movie[] {
  const ret = newAndNotableForTime(movies, Date.now() - twoWeeksOfTime)

  // If we don't get enough results for two weeks, scale it up to 4
  if (ret.length > 8) return ret
  return newAndNotableForTime(movies, Date.now() - twoWeeksOfTime * 2)
}

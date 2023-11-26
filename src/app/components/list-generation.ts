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

import { cx } from '@/lib/actions/utility'
import { i } from '@/lib/logger-client'
import { Movie } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { isCacheableImage } from '../utility'
import { defaultMovieSort } from './list-generation'

export type MovieListProps = {
  movies: Movie[]
}

export function MovieTile({ movie }: { movie: Movie }) {
  var c = cx(
    'flex items-center justify-center',
    'group relative transform transition-transform hover:scale-110',
    'rounded-lg object-cover group-hover:opacity-75 transition-opacity',
    'drop-shadow-xl hover:drop-shadow-2xl',
  )

  const href = `/play/${movie.id}`

  const cacheable = isCacheableImage(movie.image_url)
  if (!cacheable) {
    i(`Can't cache! ${new URL(movie.image_url).origin}`)
  }

  const image = cacheable ? (
    <Image
      className={c}
      style={{ maxWidth: '150px' }}
      src={movie.image_url}
      alt={movie.title}
      width={200}
      height={300}
    />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={c}
      style={{ maxWidth: '150px' }}
      src={movie.image_url}
      alt={movie.title}
      decoding='async'
      loading='lazy'
      width={200}
      height={300}
    />
  )

  return (
    <Link href={href} aria-label={movie.title}>
      {image}
    </Link>
  )
}

export default function MovieList({ movies }: MovieListProps) {
  return (
    <div className='grid grid-flow-col-dense grid-rows-2 gap-4 overflow-x-auto p-4'>
      {defaultMovieSort(movies).map((movie) => (
        <MovieTile movie={movie} key={movie.id} />
      ))}
    </div>
  )
}

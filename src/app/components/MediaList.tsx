import { cx } from '@/lib/actions/utility'
import { i } from '@/lib/logger-client'
import { Media, getTitleForMedia } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { isCacheableImage } from '../utility'

export interface MediaTileProps {
  id: string
  imageUrl: string
  title: string
}

export function MediaTile({ id, imageUrl, title }: MediaTileProps) {
  var c = cx(
    'flex items-center justify-center',
    'group relative transform transition-transform hover:scale-110',
    'rounded-lg object-cover group-hover:opacity-75 transition-opacity',
    'drop-shadow-xl hover:drop-shadow-2xl',
  )

  const href = `/play/${id}`

  const cacheable = isCacheableImage(imageUrl)
  if (!cacheable) {
    i(`Can't cache! ${new URL(imageUrl).origin}`)
  }

  const image = cacheable ? (
    <Image
      className={c}
      style={{ maxWidth: '150px' }}
      src={imageUrl}
      alt={title}
      width={200}
      height={300}
    />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={c}
      style={{ maxWidth: '150px' }}
      src={imageUrl}
      alt={title}
      decoding='async'
      loading='lazy'
      width={200}
      height={300}
    />
  )

  return (
    <Link href={href} aria-label={title}>
      {image}
    </Link>
  )
}

export interface MediaListProps {
  movies: Media[]
}

export default function MediaList({ movies }: MediaListProps) {
  return (
    <div className='grid grid-flow-col-dense grid-rows-2 gap-4 overflow-x-auto p-4'>
      {movies.map((movie) => (
        <MediaTile
          id={movie.id}
          imageUrl={movie.image_url}
          title={getTitleForMedia(movie)}
          key={movie.id}
        />
      ))}
    </div>
  )
}

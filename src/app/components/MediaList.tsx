import { cx } from '@/lib/actions/utility'
import { i } from '@/lib/logger-client'
import { Media, getTitleForMedia, isMovie } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { isCacheableImage } from '../utility'

export interface MediaTileProps {
  id: string
  imageUrl: string
  title: string
  isVertical: boolean
}

const verticalAspect = 2 / 3
const horizontalAspect = 4 / 3

export function MediaTile({ id, imageUrl, title, isVertical }: MediaTileProps) {
  var c = cx(
    'flex items-center justify-center',
    'group relative transform transition-transform hover:scale-110',
    'rounded-lg object-cover group-hover:opacity-75 transition-opacity',
    'drop-shadow-xl hover:drop-shadow-2xl',
    'mx-8 my-2',
  )

  const href = `/play/${id}`

  const { shouldCache, url } = isCacheableImage(imageUrl)
  if (!shouldCache) {
    i(`Can't cache! ${new URL(imageUrl).origin}`)
  }

  if (url.indexOf('?') > -1) {
    i(`Image URL contains query string: ${imageUrl}`)
  }

  const width = isVertical ? 200 : 300
  const height = isVertical ? width * verticalAspect : width * horizontalAspect

  const image = shouldCache ? (
    <Image
      className={c}
      style={{ maxWidth: '150px' }}
      src={url}
      alt={title}
      width={width}
      height={height}
    />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={c}
      style={{ maxWidth: '150px' }}
      src={url}
      alt={title}
      decoding='async'
      loading='lazy'
      width={width}
      height={height}
    />
  )

  return (
    <Link href={href} aria-label={title}>
      {image}
    </Link>
  )
}

export interface MediaListProps {
  media: Media[]
}

export default function MediaList({ media }: MediaListProps) {
  return (
    <div className='grid grid-flow-col-dense grid-rows-2 items-center gap-4 overflow-x-auto p-4'>
      {media.map((item) => (
        <MediaTile
          id={item.id}
          imageUrl={item.image_url}
          title={getTitleForMedia(item)}
          key={item.id}
          isVertical={isMovie(item)}
        />
      ))}
    </div>
  )
}

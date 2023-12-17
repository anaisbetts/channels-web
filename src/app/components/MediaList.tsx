import { cx } from '@/lib/actions/utility'
import { i } from '@/lib/logger-client'
import {
  Media,
  getDescriptionForMedia,
  getTitleForMedia,
  isMovie,
} from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { isCacheableImage } from '../utility'

export interface MediaTileProps {
  id: string
  imageUrl: string
  title: string
  description: string
  isVertical: boolean
}

const verticalAspect = 2 / 3
const horizontalAspect = 4 / 3

export function MediaTile({
  id,
  imageUrl,
  title,
  description,
  isVertical,
}: MediaTileProps) {
  var c = cx(
    'group relative transform transition-transform hover:scale-110',
    'rounded-lg object-cover group-hover:opacity-75 transition-opacity',
    'drop-shadow-l hover:drop-shadow-xl',
    'self-center',
    'row-span-2 col-1',
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
  const height = isVertical ? width / verticalAspect : width / horizontalAspect
  const aspectRatio = isVertical
    ? { aspectRatio: '2/3' }
    : { aspectRatio: '4/3' }

  const image = shouldCache ? (
    <Image
      className={c}
      style={aspectRatio}
      src={url}
      alt={title}
      width={width}
      height={height}
    />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={c}
      style={aspectRatio}
      src={url}
      alt={title}
      decoding='async'
      loading='lazy'
      width={width}
      height={height}
    />
  )

  return (
    <Link
      href={href}
      aria-label={title}
      className='drop-shadow-l overflow-visible hover:drop-shadow-xl'
    >
      <div className='grid h-72 max-w-[600px] grid-cols-[auto,1fr] grid-rows-[1fr,2fr] overflow-visible @container'>
        {image}
        <h2 className='hidden text-4xl text-white @sm:mx-4 @sm:inline'>
          {title}
        </h2>
        <p className='hidden text-white @sm:mx-4 @sm:my-4 @sm:inline'>
          {description}
        </p>
      </div>
    </Link>
  )
}

export interface MediaListProps {
  media: Media[]
}

export default function MediaList({ media }: MediaListProps) {
  return (
    <div className='hide-scroll grid auto-cols-[minmax(200px,1fr)] grid-flow-col grid-rows-2 gap-8 overflow-visible overflow-x-auto px-4 py-16'>
      {media.map((item) => (
        <MediaTile
          id={item.id}
          imageUrl={item.image_url}
          title={getTitleForMedia(item)}
          description={getDescriptionForMedia(item)}
          key={item.id}
          isVertical={isMovie(item)}
        />
      ))}
    </div>
  )
}

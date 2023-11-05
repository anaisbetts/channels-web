import { Movie } from '@/lib/types'
import { fetchMediaInfo, fetchMovies } from '@/server/api'
import { ensureClient } from '@/server/internal-api'
import Image from 'next/image'
import VideoPlayer from './video'
import { d } from '@/server/logger'
import { isCacheableImage } from '@/app/utility'

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

  const content = byId[params.id]

  if (!content) {
    throw new Error(`Movie ${params.id} not found`)
  }

  const metadataInfo = await fetchMediaInfo(content)
  const vstream = metadataInfo.streams.find((x) => x.coded_height)
  if (!vstream) {
    d(JSON.stringify(metadataInfo, null, 2))
    throw new Error('Media has no video stream?')
  }

  // XXX: Hack out the base URL
  const client = await ensureClient()

  const information = `${content.content_rating} | ${
    content.release_year
  } | ${Math.ceil(content.duration / 60)} minutes | ${content.genres?.join(
    ', '
  )}`

  const image = isCacheableImage(content.image_url) ? (
    <Image
      alt='Movie Cover Image'
      className='rounded-md'
      height='100'
      src={content.image_url}
      style={{
        aspectRatio: '2/3',
        objectFit: 'cover',
      }}
      width='100'
    />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt='Movie Cover Image'
      className='rounded-md'
      height='100'
      src={content.image_url}
      style={{
        aspectRatio: '2/3',
        objectFit: 'cover',
      }}
      width='100'
    />
  )

  return (
    <>
      <section>
        <VideoPlayer
          baseUrl={client.defaults.baseURL!}
          video={content}
          frameSize={[vstream.coded_width!, vstream.coded_height!]}
        />
      </section>
      <section className='mx-auto grid max-w-6xl items-start gap-6 px-4 py-6'>
        <div className='grid items-start gap-4 md:gap-10'>
          <div className='flex items-center space-x-4'>
            {image}
            <div className='flex flex-col items-start space-y-1'>
              <h2 className='text-3xl font-bold'>{content.title}</h2>
              <h3 className='text-xl italic'>{information}</h3>
            </div>
          </div>

          <p className='text-lg leading-relaxed'>
            {content.full_summary ?? content.summary}
          </p>
        </div>
      </section>
    </>
  )
}

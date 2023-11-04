import { Movie } from '@/lib/types'
import { fetchMediaInfo, fetchMovies } from '@/server/api'
import { ensureClient } from '@/server/internal-api'
import VideoPlayer from './video'

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

  if (!theMovie) {
    throw new Error(`Movie ${params.id} not found`)
  }

  const metadataInfo = await fetchMediaInfo(theMovie)
  const vstream = metadataInfo.streams.find((x) => x.coded_height)
  if (!vstream) {
    throw new Error('Media has no video stream?')
  }

  // XXX: Hack out the base URL
  const client = await ensureClient()

  return (
    <VideoPlayer
      baseUrl={client.defaults.baseURL!}
      video={theMovie}
      frameSize={[vstream.coded_width!, vstream.coded_height!]}
    />
  )
}

'use server'

import 'server-only'

import { MediaInfo, Movie, PlayableMedia, StatusInformation } from '@/lib/types'
import { ensureClient, setClient } from './internal-api'

export async function setBaseUrl(url: string) {
  await setClient(url)

  try {
    await status()
  } catch (e) {
    await setClient(null)
    throw new Error('Failed to find Channels server')
  }

  return true
}

export async function status() {
  let client = await ensureClient()

  const ret = await client.get<StatusInformation>('/status')
  console.log(ret.status)
  console.log(ret.statusText)
  //console.log(ret.request)

  return ret.data
}

export async function fetchMovies(): Promise<Movie[]> {
  let client = await ensureClient()

  const ret = await client.get<Movie[]>('/api/v1/movies')
  return ret.data
}

export async function fetchMediaInfo(media: PlayableMedia): Promise<MediaInfo> {
  let client = await ensureClient()

  const ret = await client.get<MediaInfo>(
    `/dvr/files/${media.id}/mediainfo.json`
  )

  return ret.data
}

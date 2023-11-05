'use server'

import 'server-only'

import { MediaInfo, Movie, PlayableMedia, StatusInformation } from '@/lib/types'
import { ensureClient, setClient } from './internal-api'
import { AxiosResponse } from 'axios'
import { i, w } from './logger'

function log<T, D>(res: AxiosResponse<T, D>): AxiosResponse<T, D> {
  i(`${res.request?.method} ${res.request?.path}`)

  if (res.status >= 200 && res.status < 300) {
    return res
  }

  w(`${res.request?.path} failed: ${res.status} ${res.statusText}`)
  return res
}

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

  // NB: We must use fetch here or else this will be cached incorrectly
  const { signal } = new AbortController()
  const ret = await fetch(`${client.defaults.baseURL}/status`, { signal })

  return (await ret.json()) as StatusInformation
}

export async function fetchMovies(): Promise<Movie[]> {
  let client = await ensureClient()

  const ret = log(await client.get<Movie[]>('/api/v1/movies'))
  return ret.data
}

export async function fetchMediaInfo(media: PlayableMedia): Promise<MediaInfo> {
  let client = await ensureClient()

  const ret = log(
    await client.get<MediaInfo>(`/dvr/files/${media.id}/mediainfo.json`)
  )
  return ret.data
}

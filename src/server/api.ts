'use server'

import 'server-only'

import {
  Category,
  Episode,
  Media,
  MediaInfo,
  Movie,
  PlayableMedia,
  StatusInformation,
  TVShow,
} from '@/lib/types'

import { AxiosResponse } from 'axios'
import { ensureClient, setClient } from './internal-api'
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
  setClient(url)

  try {
    await status()
  } catch (e) {
    setClient(null)
    throw new Error('Failed to find Channels server')
  }

  return true
}

export async function status() {
  let client = ensureClient()

  // NB: We must use fetch here or else this will be cached incorrectly
  const { signal } = new AbortController()
  const ret = await fetch(`${client.defaults.baseURL}/status`, { signal })

  return (await ret.json()) as StatusInformation
}

export interface FetchOpts {
  watched?: boolean
  favorited?: boolean
}

function getFiltersQueryString(options: FetchOpts = {}) {
  const [w, f] = [options.watched, options.favorited]
  const opts = [
    w !== undefined ? `watched=${w}` : null,
    f !== undefined ? `favorited=${f}` : null,
  ]

  let query = opts.filter((x) => x !== null).join('&')
  if (query.length > 0) query = `?${query}`
  return query
}

const yesIAmThatOldDontJudgeMe = /CD[12]/i
export async function fetchMovies(options: FetchOpts = {}): Promise<Movie[]> {
  let client = ensureClient()

  const ret = log(
    await client.get<Movie[]>(
      `/api/v1/movies${getFiltersQueryString(options)}`,
    ),
  )

  // NB: Channels API seems to be Gigabugged - it returns a bunch of
  // content that is very much Not Movies for the Movies endpoint. This
  // seems like the best way to filter it out.
  return ret.data.filter(
    (x) =>
      x.categories.includes(Category.Movie) &&
      x.release_year !== undefined &&
      !yesIAmThatOldDontJudgeMe.test(x.path),
  )
}

export async function fetchTVSeries(
  options: FetchOpts = {},
): Promise<TVShow[]> {
  let client = ensureClient()

  const ret = log(
    await client.get<TVShow[]>(
      `/api/v1/shows${getFiltersQueryString(options)}`,
    ),
  )
  return ret.data
}

export async function fetchAllEpisodes(
  show?: TVShow,
  options: FetchOpts = {},
): Promise<Media[]> {
  let client = ensureClient()

  const basePath = show
    ? `/api/v1/shows/${show.id}/episodes`
    : '/api/v1/episodes'

  const ret = log(
    await client.get<Episode[]>(`${basePath}${getFiltersQueryString(options)}`),
  )
  return ret.data
}

export async function fetchMediaInfo(media: PlayableMedia): Promise<MediaInfo> {
  let client = ensureClient()

  const ret = log(
    await client.get<MediaInfo>(`/dvr/files/${media.id}/mediainfo.json`),
  )
  return ret.data
}

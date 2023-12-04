import 'server-only'

import { Axios } from 'axios'
import path from 'path'
import { LocalStorage } from './persist'

import { locateDataDir } from './data-dir'
import { i } from './logger'

const localStorage = new LocalStorage(
  path.join(locateDataDir(), '.storage.json'),
)

export function setClient(baseUrl: string | null) {
  localStorage.set('baseUrl', baseUrl)
}

export function ensureClient(): Axios {
  const url = localStorage.get('baseUrl')

  if (!url) {
    i('No Channels Server set, cannot create client')
    throw new Error('No Channels Server set')
  }

  return new Axios({
    baseURL: url,
    responseType: 'json',
    transformResponse: (res) => JSON.parse(res),
  })
}

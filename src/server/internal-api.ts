import 'server-only'

import { Axios } from 'axios'
import { mkdirp } from 'mkdirp'
import storage from 'node-persist'
import path from 'path'

import { locateDataDir } from './data-dir'
import { i, w } from './logger'

let init: Promise<storage.InitOptions>
function initializeStorage() {
  if (init) return init

  const tgt = path.join(locateDataDir(), 'storage')
  mkdirp.sync(tgt)

  w(`Writing storage to ${tgt}`)
  return (init = storage.init({ dir: tgt }))
}

export async function setClient(baseUrl: string | null) {
  await initializeStorage()
  await storage.setItem('baseUrl', baseUrl)
}

export async function ensureClient(): Promise<Axios> {
  await initializeStorage()
  const url = await storage.getItem('baseUrl')

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

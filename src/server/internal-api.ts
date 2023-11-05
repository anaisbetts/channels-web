import 'server-only'

import { Axios } from 'axios'
import storage from 'node-persist'
import { mkdirp } from 'mkdirp'
import fs from 'fs'
import path from 'path'
import { i, w } from './logger'

let dataDir: string
export function locateDataDir() {
  if (dataDir) return dataDir

  // NB: If we don't do this, we will end up writing to a read-only part
  // inside the Docker image
  const storagePath = process.env.DATA_DIR ?? path.join('.next')
  const devStoragePath = path.join(__dirname, '..', '..', '.next')

  let sp = devStoragePath
  try {
    fs.statSync(storagePath)
    sp = storagePath
    w(`Using storage path ${sp}`)
  } catch (e) {
    w(`Using alternate storage path ${sp}`)
  }

  return (dataDir = sp)
}

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
    throw new Error('No Channels Server set')
  }

  return new Axios({
    baseURL: url,
    responseType: 'json',
    transformResponse: (res) => JSON.parse(res),
  })
}

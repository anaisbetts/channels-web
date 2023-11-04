import 'server-only'

import { Axios } from 'axios'
import storage from 'node-persist'
import { mkdirp } from 'mkdirp'
import fs from 'fs'
import path from 'path'

// NB: If we don't do this, we will end up writing to a read-only part
// inside the Docker image
const storagePath = path.join('.next')
const altStoragePath = path.join(__dirname, '..', '..', '.next')

let sp = altStoragePath
try {
  fs.statSync(storagePath)
  sp = storagePath
} catch (e) {
  console.log('Using alternate storage path')
}

const tgt = path.join(sp, 'storage')
mkdirp.sync(tgt)

console.log(`Writing config to ${tgt}`)
const init = storage.init({ dir: tgt })

export async function setClient(baseUrl: string | null) {
  await init
  await storage.setItem('baseUrl', baseUrl)
}

export async function ensureClient(): Promise<Axios> {
  await init
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

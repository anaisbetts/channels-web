import 'server-only'

import { Axios } from 'axios'
import storage from 'node-persist'
import { mkdirp } from 'mkdirp'
import path from 'path'

// NB: If we don't do this, we will end up writing to a read-only part
// inside the Docker image
const storagePath = path.join(__dirname, '..', '..', '.next', 'storage')
mkdirp.sync(storagePath)

const init = storage.init({ dir: storagePath })

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

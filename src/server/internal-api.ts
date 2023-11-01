import 'server-only'

import { Axios } from 'axios'
import storage from 'node-persist'

const init = storage.init()

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

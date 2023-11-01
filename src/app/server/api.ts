'use server'

import 'server-only'

import { Axios } from 'axios'
import { StatusInformation } from '@/lib/types'

import { ensureClient, setClient } from './internal-api'

export async function setBaseUrl(url: string) {
  setClient(
    new Axios({
      baseURL: url,
      responseType: 'json',
      transformResponse: (res) => JSON.parse(res),
    })
  )

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

  return (await client.get<StatusInformation>('/status')).data
}

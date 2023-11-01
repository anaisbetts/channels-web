"use server"

import 'server-only'

import { Axios } from 'axios';
import { StatusInformation } from '@/lib/types';

let client: Axios | null;

function ensureClient(): Axios {
  if (!client) {
    throw new Error("No Channels Server set")
  }

  return client
}

export async function setBaseUrl(url: string) {
  client = new Axios({ baseURL: url, responseType: 'json', transformResponse: (res) => JSON.parse(res) })

  try {
    await status();
  } catch (e) {
    client = null
    throw new Error("Failed to find Channels server")
  }

  return true
}

export async function status() {
  let client = ensureClient()

  return (await client.get<StatusInformation>("/status")).data
}

"use server"

import 'server-only'

export async function fetchStatus() {
  const ret = await fetch("http://192.168.4.10:8089/status")
  return ret.json()
}

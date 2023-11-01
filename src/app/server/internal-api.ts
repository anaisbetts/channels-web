import 'server-only'

import { Axios } from "axios";

let client: Axios | null;

export function setClient(newClient: Axios | null) {
	client = newClient
}

export function ensureClient(): Axios {
  if (!client) {
    throw new Error("No Channels Server set")
  }

  return client
}

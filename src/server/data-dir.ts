/* eslint-disable no-console */
import 'server-only'

// NB: We cannot use logging in this file because the logger itself uses this
// file to set itself up

import { isDev } from '@/app/utility'
import fs from 'fs'
import path from 'path'

function appDevRoot() {
  // NB: Next.js does crazy things to dirname, we need to use a different way
  // to find the app root
  return path.dirname(process.env.npm_package_json ?? process.cwd())
}

let dataDir: string
export function locateDataDir() {
  if (dataDir) return dataDir

  // NB: If we don't do this, we will end up writing to a read-only part
  // inside the Docker image
  const storagePath = process.env.DATA_DIR ?? path.join(process.cwd(), '.next')
  const devStoragePath = isDev ? appDevRoot() : storagePath

  let sp = devStoragePath
  try {
    if (!isDev) {
      fs.statSync(storagePath)
      sp = storagePath
      console.warn(`Using data root path ${sp}`)
    } else {
      throw new Error('not dev')
    }
  } catch (e) {
    console.warn(`Using alternate data path ${sp}`)
  }

  return (dataDir = sp)
}

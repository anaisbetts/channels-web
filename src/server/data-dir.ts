/* eslint-disable no-console */
import 'server-only'

// NB: We cannot use logging in this file because the logger itself uses this
// file to set itself up

import fs from 'fs'
import path from 'path'

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
    console.warn(`Using storage path ${sp}`)
  } catch (e) {
    console.warn(`Using alternate storage path ${sp}`)
  }

  return (dataDir = sp)
}

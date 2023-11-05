import { Logger } from '@/lib/types'

const isDev = process.env.NODE_ENV !== 'production'

const log: Logger = {
  d: isDev ? console.debug.bind(console) : () => {},
  i: isDev ? console.info.bind(console) : () => {},
  w: console.warn.bind(console),
  e: console.error.bind(console),
}

export const d = log.d
export const i = log.i
export const w = log.w
export const e = log.e

export default log

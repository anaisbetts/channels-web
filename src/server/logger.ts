/* eslint-disable no-console */
import 'server-only'

import { mkdirp } from 'mkdirp'
import path from 'path'
import * as winston from 'winston'
import 'winston-daily-rotate-file'

import { locateDataDir } from './data-dir'
import { Logger } from '@/lib/types'

// Borrowed from https://github.com/sct/overseerr/blob/develop/server/logger.ts

const hformat = winston.format.printf(
  ({ level, label, message, timestamp, ...metadata }) => {
    let msg = `${timestamp} [${level}]${label ? `[${label}]` : ''}: ${message} `
    if (Object.keys(metadata).length > 0) {
      msg += JSON.stringify(metadata)
    }
    return msg
  }
)

let logDir: string
function locateLogDir() {
  if (logDir) return logDir

  const tgt = path.join(locateDataDir(), 'logs')
  mkdirp.sync(tgt)

  console.warn(`Writing logs to ${tgt}`)
  return (logDir = tgt)
}

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL?.toLowerCase() || 'debug',
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.timestamp(),
    hformat
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.splat(),
        winston.format.timestamp(),
        hformat
      ),
    }),
    new winston.transports.DailyRotateFile({
      filename: path.join(locateLogDir(), 'channels-web-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '2d',
      createSymlink: true,
      symlinkName: 'channels-web.log',
    }),
  ],
})

const log: Logger = {
  d: logger.debug.bind(logger),
  i: logger.info.bind(logger),
  w: logger.warn.bind(logger),
  e: logger.error.bind(logger),
}

export const d = log.d
export const i = log.i
export const w = log.w
export const e = log.e

export default log

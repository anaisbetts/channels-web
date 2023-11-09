// NB: This needs to be synced with next.config.js
const cachedHosts: Record<string, boolean> = {
  'https://image.tmbd.org': true,
  'http://fanc.tmsimg.com': true,
  'https://tmsimg.fancybits.co': true,
}

// NB: Next.js's Image element that does all of our great image
// optimization needs a fixed list of hosts to cache. Unfortunately
// one of the image sources that Channels can return is a URL to
// itself, which of course will be dynamic
export function isCacheableImage(url: string) {
  const origin = new URL(url).origin

  const ret = cachedHosts[origin] === true
  return ret
}

export const isDev = process.env.NODE_ENV !== 'production'

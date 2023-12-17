// NB: This needs to be synced with next.config.js
const cachedHosts: Record<string, boolean> = {
  'https://image.tmdb.org': true,
  'http://fanc.tmsimg.com': true,
  'https://tmsimg.fancybits.co': true,
  'http://tmsimg.fancybits.co': true,
}

const shouldStrip: Record<string, boolean> = {
  'https://tmsimg.fancybits.co': true,
}

// NB: Next.js's Image element that does all of our great image
// optimization needs a fixed list of hosts to cache. Unfortunately
// one of the image sources that Channels can return is a URL to
// itself, which of course will be dynamic
export function isCacheableImage(url: string) {
  const u = new URL(url)
  let finalUrl = url

  if (shouldStrip[u.origin]) {
    finalUrl = `${u.origin}${u.pathname}`
  }

  finalUrl = finalUrl.replace(
    /\/\/fanc.tmsimg.com\//i,
    '//tmsimg.fancybits.co/',
  )

  const ret = cachedHosts[u.origin] === true
  return { shouldCache: ret, url: finalUrl }
}

export const isDev = process.env.NODE_ENV !== 'production'

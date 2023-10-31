import { useCallback, useEffect, useRef, useState } from 'react'

export function useMounted() {
  const mounted = useRef<boolean>(true)

  useEffect(() => {
    mounted.current = true

    return () => {
      mounted.current = false
    }
  }, [mounted])

  return mounted
}

export function useExplicitRender() {
  const [n, setN] = useState(0)

  const rerender = useCallback(() => setN((x) => x + 1), [])
  return { dep: n, rerender }
}

export function unawaited<T>(p: Promise<T>) {
  p.then((_) => {})
}

export function cx(...args: (string | null | undefined | false)[]) {
  return args
    .reduce((acc: string[], arg) => {
      const toSplit = arg || ''

      toSplit.split(' ').forEach((x) => {
        if (x && x.length > 1) acc.push(x)
      })

      return acc
    }, [])
    .join(' ')
}

export function promiseFinally<T>(p: Promise<T>, block: () => unknown) {
  return p.then(
    (x) => {
      block()
      return Promise.resolve(x)
    },
    (e) => {
      block()
      return Promise.reject(e)
    }
  )
}

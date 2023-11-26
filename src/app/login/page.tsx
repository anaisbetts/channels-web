'use client'

import { useAction } from '@/lib/actions/action'
import { setBaseUrl } from '@/server/api'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { e } from '@/lib/logger-client'
import ActualLayout from '../components/ActualLayout'

export default function Login() {
  const router = useRouter()
  const [server, setServer] = useState<string | null>(null)
  const [invoke, result, reset] = useAction(
    () => setBaseUrl(server ?? 'no'),
    [server],
  )

  // We've got a valid server? Let's get out of here
  const shouldRedirect = result.isOk() && result.ok() == true
  useEffect(() => {
    if (shouldRedirect) router.replace('/')
  }, [router, shouldRedirect])

  // When something goes wrong, tell the user
  // then reset the form
  const err = result.isErr()
  useEffect(() => {
    if (!err) return
    e(err)

    setTimeout(() => {
      reset()
      setServer('')
    }, 5 * 1000)
  }, [reset, err])

  return (
    <ActualLayout>
      <dialog open>
        <h2>Set a Channels Server</h2>
        <p>Configure which server to use with Channels.</p>

        <form onSubmit={invoke}>
          <label htmlFor='server'>Server</label>
          <input
            type='text'
            id='server'
            name='server'
            onChange={(e) => setServer(e.target.value)}
          />

          <button
            type='submit'
            disabled={!result.isOk() || server == null || server.length < 5}
          >
            Set Server
          </button>

          {err && <p>Oye, its not good!</p>}
        </form>
      </dialog>
    </ActualLayout>
  )
}

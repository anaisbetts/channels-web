import { status } from '@/server/api'
import { redirect } from 'next/navigation'

export default async function Home() {
  try {
    await status()
  } catch (e) {
    redirect('/login')
  }

  return <h2>u did it</h2>
}

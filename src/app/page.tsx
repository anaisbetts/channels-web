import { status } from './server/api'

export default async function Home() {
  try {
    await status()
  } catch (e) {
    return <h2>We need a client :P</h2>
  }

  return (
    <main className='min-h-screen'>
      <h2>u did it</h2>
    </main>
  )
}

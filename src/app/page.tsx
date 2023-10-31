import { Suspense } from "react"
import Status, { PlayThatVideo } from "./client"
import Image from 'next/image'

export default function Home() {
  const sekrit = 'kF4Q0iM8G7wEC6vHiJLqu19nxwt'

  return (
    <main className="min-h-screen">
      <Status />
      <Image src={`https://image.tmdb.org/t/p/w780//${sekrit}.jpg`} alt="" width={300} height={300} />

      <PlayThatVideo />
    </main>
  )
}

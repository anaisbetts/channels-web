'use client'

import { PlayableMedia } from '@/lib/types'
import { useWindowSize } from '@uidotdev/usehooks'
import dynamic from 'next/dynamic'
import { useRef } from 'react'

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })

export type VideoPlayerProps = {
  baseUrl: string
  video: PlayableMedia
  frameSize: [number, number]
}

function buildStreamUrlForVideo(baseUrl: string, video: PlayableMedia) {
  return `${baseUrl}/dvr/files/${video.id}/hls/master.m3u8`
}

export default function VideoPlayer({
  baseUrl,
  video,
  frameSize,
}: VideoPlayerProps) {
  const { height } = useWindowSize()
  const box = useRef<HTMLDivElement>(null)
  const player = useRef<ReactPlayer>(null)
  const width = (box.current?.clientWidth ?? 640) - 20

  const aspect = frameSize[0] / frameSize[1]
  const maxHeight = height ?? 480
  let videoWidth = width ?? 640
  let videoHeight = videoWidth / aspect

  if (videoHeight > maxHeight) {
    videoWidth = maxHeight * aspect
    videoHeight = maxHeight
  }

  return (
    <div ref={box}>
      <ReactPlayer
        ref={player}
        light={video.thumbnail_url}
        url={buildStreamUrlForVideo(baseUrl, video)}
        width='100%'
        height={player.current?.getDuration() ? '100%' : videoHeight}
        controls={true}
      />
    </div>
  )
}

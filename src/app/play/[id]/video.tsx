'use client'

import { PlayableMedia } from '@/lib/types'
import { useWindowSize } from '@uidotdev/usehooks'
import dynamic from 'next/dynamic'

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
  const { width, height } = useWindowSize()

  ;(window as any).video = video

  const aspect = frameSize[0] / frameSize[1]
  const maxHeight = height ?? 480
  let videoWidth = width ?? 640
  let videoHeight = videoWidth / aspect

  if (videoHeight > maxHeight) {
    videoWidth = maxHeight * aspect
    videoHeight = maxHeight
  }

  return (
    <ReactPlayer
      light={video.thumbnail_url}
      url={buildStreamUrlForVideo(baseUrl, video)}
      width={width ?? 640}
      height={videoHeight}
      controls={true}
    />
  )
}

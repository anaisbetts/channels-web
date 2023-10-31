"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic";

import { usePromise } from "@/actions/promise";
import { fetchStatus } from "./servaction";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false })

export default function Status() {
	const data = usePromise(() => fetchStatus(), [])

	if (data.isPending()) {
		return <h2>Workin on it</h2>
	}

	const text = `home page. the text is ${JSON.stringify(data.ok())}`
	return <h2>{text}</h2>
}

export function PlayThatVideo() {
  const sekrit = 'kF4Q0iM8G7wEC6vHiJLqu19nxwt'
	return (
    <>
			<ReactPlayer
				light={`https://image.tmdb.org/t/p/w780//${sekrit}.jpg`}
				url="http://192.168.4.10:8089/dvr/files/4948/hls/stream.m3u8?abitrate=64&acodec=aac&bitrate=436&resolution=384&ssize=1&vcodec=h264"
				width={640}
				controls={true}
				//playing={playing} onClickPreview={() => setPlaying(true)} onLoadedData={onLoadedData}
			/>
    </>
  );
	//return <ReactPlayer src="https://www.youtube.com/watch?v=BUoCzPauwMU" />
}
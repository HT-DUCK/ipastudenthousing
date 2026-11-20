'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { VideoType } from 'lib/types';

const Video = ({ video, video_className, embed_className, videoRef }: { video: VideoType; video_className?: string; embed_className?: string; videoRef?: any }) => {
	const [play, setPlay] = useState(false);

	//__Use Effects
	useEffect(() => {
		if (videoRef?.current) {
			if (video.autoplay) {
				setPlay(true);
			}
		}
	}, [videoRef]);

	//__Functions

	if (!video) return null;
	return video.video_type === 'internal' && video.file?.url ? (
		<video preload='auto' poster={video.file.fallback_image?.url || ''} controls={video.controls} autoPlay={video.autoplay} muted={video.muted} loop={video.loop} playsInline ref={videoRef} onEnded={() => setPlay(false)} onPause={() => setPlay(false)} onPlay={() => setPlay(true)} className={`${video_className}${play ? ' playing' : ''}`}>
			<source src={video.file.url} type='video/mp4' />
			{video.file.webm?.url && <source src={video.file.webm.url} type='video/webm' />}
			{video.file.ogg?.url && <source src={video.file.ogg.url} type='video/ogg' />}
			{video.file.fallback_image?.url ? <Image src={video.file.fallback_image.url} alt={video.file.fallback_image.alt} height={video.file.fallback_image.height} width={video.file.fallback_image.width} placeholder='blur' blurDataURL={video.file.fallback_image.medium || video.file.fallback_image.url} /> : ''}
		</video>
	) : video.video_type === 'external' && video.video_embed_code ? (
		<div className={embed_className} dangerouslySetInnerHTML={{ __html: video.video_embed_code }} />
	) : null;
};

export default Video;

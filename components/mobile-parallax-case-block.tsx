'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { AlternatingRowsType } from 'lib/types';

import AlternatingRowsContent from 'components/alternating-rows__content';

type MobileParallaxCaseBlockProps = {
	item: AlternatingRowsType;
	nextRef?: React.RefObject<HTMLDivElement | null>;
};

const MobileParallaxCaseBlock = ({ item, nextRef }: MobileParallaxCaseBlockProps) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const refContent = useRef<HTMLDivElement | null>(null);
	const [imageTranslateY, setImageTranslateY] = useState(100);
	const observerRef = useRef<IntersectionObserver | null>(null);
	const [isVisible, setIsVisible] = useState(false);
	const [overlayOpacity, setOverlayOpacity] = useState(0);
	const [isBigContent, setIsBigContent] = useState(false);

	const isWhiteType = item.background_color ? false : true;

	useEffect(() => {
		const handleScroll = () => {
			if (!ref.current) return;

			const currentRect = ref.current.getBoundingClientRect();
			const nextRect = nextRef?.current?.getBoundingClientRect();

			const rect = ref.current.getBoundingClientRect();
			const windowHeight = window.innerHeight;
			const total = rect.height;
			const visibleDistance = windowHeight - rect.top;
			const progress = Math.min(1, Math.max(0, visibleDistance / total));
			const translateY = (1 - progress) * 100;

			setImageTranslateY(translateY);

			if (!nextRect) {
				setOverlayOpacity(0);
				return;
			}

			const distance = nextRect.top - currentRect.bottom;

			if (distance < 0 && distance > -currentRect.height) {
				const progress = Math.min(Math.abs(distance) / currentRect.height, 1);
				const newOpacity = progress * 1.2;
				setOverlayOpacity(newOpacity);
			} else if (distance >= 0) {
				setOverlayOpacity(0);
			} else {
				setOverlayOpacity(1);
			}
		};

		if (isVisible && nextRef !== undefined) {
			handleScroll();
			window.addEventListener('scroll', handleScroll);
		} else {
			window.removeEventListener('scroll', handleScroll);
			setOverlayOpacity(0);
		}

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [isVisible, nextRef]);

	useEffect(() => {
		if (!ref.current) return;

		observerRef.current = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting);
			},
			{
				threshold: 0.1
			}
		);

		observerRef.current.observe(ref.current);

		return () => {
			observerRef.current?.disconnect();
		};
	}, []);

	useEffect(() => {
		if (!refContent.current) return;
		const windowHeight = window.innerHeight;
		const rect = refContent.current.getBoundingClientRect();
		const total = rect.height;

		setIsBigContent(total > windowHeight);
	}, []);

	return (
		<div ref={ref} className='relative'>
			<div
				className='absolute top-0 left-0 w-full h-full z-2 bg-base-black-50 pointer-events-none'
				style={{
					opacity: overlayOpacity,
					transition: 'opacity 0.3s ease-out'
				}}
			/>
			<div className='relative w-full h-100 overflow-hidden max-md:sticky max-md:top-0'>
				<div className='absolute top-[-100px] left-0 w-full h-[calc(100%+100px)] transition-transform duration-300 ease-out' style={{ transform: `translateY(${imageTranslateY}px)` }}>
					{item.media.image?.image ? <Image src={item.media.image.image.url} alt={item.media.image.image.alt} fill className='object-cover' /> : null}
				</div>
			</div>
			<div ref={refContent} className={`py-10 px-5 w-full min-h-[100dvh] max-md:pb-20 z-1 relative ${isWhiteType ? 'text-gunmetal' : 'text-white'} ${!isBigContent ? 'max-md:sticky max-md:top-[76px] max-md:-mb-[76px]' : ''}`} style={{ backgroundColor: item.background_color || 'white', color: item.text_color || '' }}>
				<AlternatingRowsContent item={item} />
			</div>
		</div>
	);
};

export default MobileParallaxCaseBlock;

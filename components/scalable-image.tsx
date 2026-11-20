'use client';
import React, { useEffect, useRef, useState } from 'react';
import { memo } from 'react';
import Image from 'next/image';
import type { ImageType } from 'lib/types';

type ScalableImageProps = {
	image: ImageType;
	id: number;
	onActivate: (index: number) => void;
	refLastElement?: React.RefObject<HTMLDivElement | null>;
};

const ScalableImage = ({ image, id, onActivate, refLastElement }: ScalableImageProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const [transform, setTransform] = useState('scale3d(1, 1, 1) translate3d(0px, 0px, 0px)');
	const wasActive = useRef(false);
	const [isVisible, setIsVisible] = useState(false);
	const [isLastElementVisible, setIsLastElementVisible] = useState(false);

	useEffect(() => {
		if (!ref.current) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting);
			},
			{ threshold: 0.1 }
		);

		observer.observe(ref.current);

		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		if (!refLastElement?.current) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsLastElementVisible(entry.isIntersecting);
			},
			{ threshold: 0.1 }
		);

		observer.observe(refLastElement.current);

		return () => observer.disconnect();
	}, [refLastElement]);

	useEffect(() => {
		const handleScroll = () => {
			if (!ref.current || !isVisible) return;

			const rect = ref.current.getBoundingClientRect();
			const windowHeight = window.innerHeight;
			const visibleRatio = 1 - rect.top / windowHeight;
			const clamped = Math.max(0, Math.min(2, visibleRatio));

			const scale = 1 + clamped * 0.1;
			const translateY = clamped * 50;
			setTransform(`scale3d(${scale}, ${scale}, 1) translate3d(0px, ${translateY}px, 0px)`);

			const screenMiddle = windowHeight / 2;
			const isNowActive = rect.top <= screenMiddle && rect.bottom >= screenMiddle;

			if (isNowActive && !wasActive.current) {
				onActivate(id);
				wasActive.current = true;
			} else if (!isNowActive) {
				wasActive.current = false;
			}
		};

		if (!isLastElementVisible && isVisible) {
			window.addEventListener('scroll', handleScroll, { passive: true });
			handleScroll();
		} else {
			window.removeEventListener('scroll', handleScroll);
		}

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [id, onActivate, isVisible, isLastElementVisible]);

	return (
		<div ref={ref} className='relative min-h-[100dvh] overflow-hidden'>
			<div className='absolute top-0 left-0 h-[110%] w-full translate-y-[-10%]'>
				<Image src={image.url} alt={image.alt} fill style={{ transform }} className='object-cover transition-transform duration-300 ease-out will-change-transform' />
			</div>
		</div>
	);
};

export default memo(ScalableImage);

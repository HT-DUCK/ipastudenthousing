'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ImageType, LinkType } from 'lib/types';
import { Button } from 'elements';
import { ArrowButtonIcon } from 'components/svg';

type ParalaxBlockType = {
	button: LinkType;
	image: ImageType;
	description_wysiwyg: string;
	title: string;
};

const StickyParallaxBlock = ({ item, nextRef, isDesktop, index }: { item: ParalaxBlockType; nextRef?: React.RefObject<HTMLDivElement | null>; isDesktop: boolean; index: number }) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const refContent = useRef<HTMLDivElement | null>(null);
	const [scale, setScale] = useState(1);
	const [overlayOpacity, setOverlayOpacity] = useState(0);
	const observerRef = useRef<IntersectionObserver | null>(null);
	const [isVisible, setIsVisible] = useState(false);
	const [imageTranslateY, setImageTranslateY] = useState(100);

	const [isBigContent, setIsBigContent] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (!ref.current || !isVisible) return;

			const currentRect = ref.current.getBoundingClientRect();
			const nextRect = nextRef?.current?.getBoundingClientRect();

			if (!isDesktop) {
				const rect = ref.current.getBoundingClientRect();
				const windowHeight = window.innerHeight;

				const total = rect.height;
				const visibleDistance = windowHeight - rect.top;
				const progress = Math.min(1, Math.max(0, visibleDistance / total));
				const translateY = (1 - progress) * 100;

				setImageTranslateY(translateY);
			}

			if (!nextRect) {
				setScale(1);
				setOverlayOpacity(0);
				return;
			}

			const distance = nextRect.top - currentRect.bottom;

			if (distance < 0 && distance > -currentRect.height) {
				const progress = Math.min(Math.abs(distance) / currentRect.height, 1);
				const newScale = 1 - progress * 0.2;
				const newOpacity = progress * 1.2;
				if (isDesktop) {
					setScale(newScale);
				}
				setOverlayOpacity(newOpacity);
			} else if (distance >= 0) {
				if (isDesktop) {
					setScale(1);
				}
				setOverlayOpacity(0);
			} else {
				if (isDesktop) {
					setScale(0.8);
				}
				setOverlayOpacity(1);
			}
		};

		if (isVisible && nextRef !== undefined) {
			handleScroll();
			window.addEventListener('scroll', handleScroll);
		} else {
			window.removeEventListener('scroll', handleScroll);
			setScale(1);
			setOverlayOpacity(0);
		}

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [isVisible, nextRef, isDesktop]);

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
		<div
			ref={ref}
			style={{
				transform: `scale(${scale})`,
				transition: 'transform 0.3s ease-out'
			}}
			className='relative flex flex-col md:flex-row min-h-130 max-md:min-h-[100dvh] max-md:bg-white'
		>
			<div
				className='absolute top-0 left-0 w-full h-full z-2 bg-base-black-50 pointer-events-none'
				style={{
					opacity: overlayOpacity,
					transition: 'opacity 0.3s ease-out'
				}}
			/>
			<div className={`md:w-[50%] min-h-[524px] md:min-h-[0] relative overflow-hidden max-md:sticky max-md:top-0 ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
				<Image src={item.image.url} alt={item.image.alt} fill className='object-cover max-md:hidden' />
				<div
					className='absolute top-0 max-md:top-[-100px] left-0 w-full h-full max-md:h-[calc(100%+100px)] transition-transform duration-300 ease-out md:hidden'
					style={{
						transform: `translateY(${imageTranslateY}px)`
					}}
				>
					<Image src={item.image.url} alt={item.image.alt} fill className='object-cover' />
				</div>
			</div>

			<div ref={refContent} className={`md:w-[50%] px-5 py-10 lg:p-16 bg-[#fff] flex flex-col items-start ${nextRef !== undefined ? ' max-md:pb-20' : ''} max-md:min-h-[100dvh] relative z-1 ${!isBigContent ? 'max-md:sticky max-md:top-[76px] max-md:-mb-[76px]' : ''}`}>
				<h2 className='h2 text-base-gunmetal' dangerouslySetInnerHTML={{ __html: item.title }} />
				<div className='mb-8 mt-6 text-base-gunmetal/70 text-sm [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 md:mt-8' dangerouslySetInnerHTML={{ __html: item.description_wysiwyg }} />
				<Button link={item.button} className='btn btn-blue mt-2 md:mt-auto'>
					<ArrowButtonIcon width={24} />
				</Button>
			</div>
		</div>
	);
};

export default StickyParallaxBlock;

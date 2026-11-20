'use client';

import { useEffect, useRef, useState } from 'react';
import ParallaxContentBlock from './parallax-content-block';
import ParallaxContentBack from './parallax-content-back';
import type { ImageType, LinkType } from 'lib/types';

type ItemType = {
	background_image?: ImageType;
	columns: boolean;
	left_position?: boolean;
	column_1?: { content?: string; cta?: LinkType; cta_icon_image?: ImageType; heading?: string; subheading?: string };
	column_2?: { content?: string; cta?: LinkType; cta_icon_image?: ImageType; heading?: string; subheading?: string };
	content?: string;
	cta?: LinkType;
	cta_icon_image?: ImageType;
	heading?: string;
	subheading?: string;
};

const SCALE_DELTA = 0.3;
const HEADER_OFFSET = 0;

const ParallaxContentContainer = ({ blocks }: { blocks: ItemType[] }) => {
	const [visibleBackIndex, setVisibleBackIndex] = useState<number>(() => (blocks.length > 1 ? 1 : -1));
	const [scaleT, setScaleT] = useState(0);
	const ticking = useRef(false);

	const getSectionEls = () => blocks.map((_, i) => document.getElementById(`parallax_column_${i}`)).filter(Boolean) as HTMLElement[];

	const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

	const computeState = () => {
		const sections = getSectionEls();
		if (!sections.length) return;

		const triggerIndices = sections.map((_, i) => i).filter((i) => i % 2 === 0);

		let lastTrigger: number | null = null;
		for (const i of triggerIndices) {
			const top = sections[i].getBoundingClientRect().top - HEADER_OFFSET;
			if (top <= 0) lastTrigger = i;
		}

		let nextBack = blocks.length > 1 ? 1 : -1;
		if (lastTrigger !== null) {
			const candidate = lastTrigger + 1;
			if (candidate % 2 === 1 && candidate < blocks.length) {
				nextBack = candidate;
			}
		}
		setVisibleBackIndex(nextBack);

		if (nextBack >= 0) {
			const prevTrigger = nextBack - 1;
			const nextTrigger = nextBack + 1;
			const prevTop = sections[prevTrigger]?.getBoundingClientRect().top - HEADER_OFFSET;

			let t = 0;
			if (sections[prevTrigger]) {
				if (sections[nextTrigger]) {
					const nextTop = sections[nextTrigger].getBoundingClientRect().top - HEADER_OFFSET;
					const denom = nextTop - prevTop;
					t = denom > 0 ? (0 - prevTop) / denom : 1;
				} else {
					const vh = window.innerHeight;
					const span = vh + sections[prevTrigger].getBoundingClientRect().height;
					t = clamp((vh - (prevTop + HEADER_OFFSET)) / span);
				}
			}
			setScaleT(clamp(t));
		}
	};

	const onScrollOrResize = () => {
		if (!ticking.current) {
			ticking.current = true;
			requestAnimationFrame(() => {
				computeState();
				ticking.current = false;
			});
		}
	};

	useEffect(() => {
		computeState();
		window.addEventListener('scroll', onScrollOrResize, { passive: true });
		window.addEventListener('resize', onScrollOrResize);
		return () => {
			window.removeEventListener('scroll', onScrollOrResize);
			window.removeEventListener('resize', onScrollOrResize);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [blocks.length, HEADER_OFFSET]);

	return (
		<div className='relative'>
			<ParallaxContentBack blocks={blocks} visibleBackIndex={visibleBackIndex} scale={1 + SCALE_DELTA * scaleT} />
			{blocks.map((item, i) => {
				const isLast = i === blocks.length - 1;
				const isOdd = blocks.length % 2 !== 0;
				const isSingle = isLast && isOdd;

				return <ParallaxContentBlock key={i} item={item} index={i} isSingle={isSingle} />;
			})}
		</div>
	);
};

export default ParallaxContentContainer;

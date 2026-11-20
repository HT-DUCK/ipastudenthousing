'use client';

import { useEffect, useRef, useState } from 'react';
import HeroMainBlock from 'components/hero-main-block';
import StickyParralaxBlocks from 'components/sticky-parralax-blocks';
import { LinkType } from 'lib/types';
import StickyContent from 'components/sticky-content';
import { ParalaxBlockType } from 'lib/types';

const HeroWithParallaxBlocks = ({ title, description, hero_button, parallax_blocks }: { title: string; description: string; hero_button: LinkType; parallax_blocks: ParalaxBlockType[] }) => {
	const heroRef = useRef<HTMLDivElement>(null);
	const parallaxRef = useRef<HTMLDivElement>(null);
	const [heroOpacity, setHeroOpacity] = useState(1);
	const [isHeroVisible, setIsHeroVisible] = useState(false);
	const [isDesktop, setIsDesktop] = useState(() => (typeof window !== 'undefined' ? window.innerWidth > 767 : false));

	useEffect(() => {
		const handleResize = () => {
			setIsDesktop(window.innerWidth >= 768);
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		if (!heroRef.current) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsHeroVisible(entry.isIntersecting);
			},
			{ threshold: 0.1 }
		);

		observer.observe(heroRef.current);

		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		const onScroll = () => {
			if (!isDesktop || !heroRef.current || !parallaxRef.current || !isHeroVisible) return;

			const heroRect = heroRef.current.getBoundingClientRect();
			const parallaxRect = parallaxRef.current.getBoundingClientRect();

			const shouldFade = parallaxRect.top <= heroRect.top;
			setHeroOpacity(shouldFade ? 0 : 1);
		};

		if (isHeroVisible && isDesktop) {
			window.addEventListener('scroll', onScroll);
		} else {
			window.removeEventListener('scroll', onScroll);
			setHeroOpacity(1);
		}

		return () => window.removeEventListener('scroll', onScroll);
	}, [isHeroVisible, isDesktop]);

	return (
		<div className='flex flex-col md:gap-10'>
			<StickyContent>
				<div
					ref={heroRef}
					className='min-h-[100dvh] flex'
					style={{
						opacity: heroOpacity,
						transition: 'opacity 0.4s ease'
					}}
				>
					<HeroMainBlock title={title} description={description} hero_button={hero_button} />
				</div>
			</StickyContent>

			<div ref={parallaxRef} className='flex flex-col md:gap-10'>
				<StickyParralaxBlocks parallax_blocks={parallax_blocks} isDesktop={isDesktop} />
			</div>
		</div>
	);
};

export default HeroWithParallaxBlocks;

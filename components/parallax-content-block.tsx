'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { AnimateWrapper } from 'wrappers';
import { Button, SvgImage } from 'elements';
import { ImageType, LinkType } from 'lib/types';
import { ArrowButtonIcon } from 'components/svg';

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

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

const EXTRA_BG_OFFSET_PX = 200;

const ParallaxContentBlock = ({ item, index, isSingle = false }: { item: ItemType; index: number; isSingle?: boolean }) => {
	const { background_image, columns, column_1, column_2, content, cta, cta_icon_image, heading, subheading, left_position } = item || {};

	const isStickyBg = index % 2 === 1;

	const sectionRef = useRef<HTMLDivElement | null>(null);
	const bgRef = useRef<HTMLDivElement | null>(null);
	const contentRef = useRef<HTMLDivElement | null>(null);

	const targetProg = useRef(0);
	const smoothProg = useRef(0);
	const rafId = useRef<number | null>(null);
	const active = useRef(false);
	const ioRef = useRef<IntersectionObserver | null>(null);

	const pathname = usePathname();

	useEffect(() => {
		const reduceMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

		if (bgRef.current) bgRef.current.style.transform = 'translate3d(0,0,0)';
		if (contentRef.current) contentRef.current.style.transform = 'translate3d(0,0,0)';

		const measure = () => {
			if (!sectionRef.current) return;
			const rect = sectionRef.current.getBoundingClientRect();
			const vh = window.innerHeight;
			const total = vh + rect.height;
			const passed = vh - rect.top;
			const progress = clamp(passed / total, 0, 1);
			targetProg.current = progress;
			if (reduceMotion) smoothProg.current = targetProg.current;
		};

		const tick = () => {
			if (!active.current) return;

			smoothProg.current = lerp(smoothProg.current, targetProg.current, 0.12);

			let bgShift = 0;
			let contentShift = 0;

			if (isSingle) {
				bgShift = -EXTRA_BG_OFFSET_PX * smoothProg.current;
				const CONTENT_SINGLE_PX = 80;
				contentShift = CONTENT_SINGLE_PX * smoothProg.current;
			} else {
				const bgBase = window.innerHeight * 0.1;
				const contentBase = window.innerHeight * 0.1;
				bgShift = -bgBase * smoothProg.current;
				contentShift = contentBase * smoothProg.current;
			}

			if (bgRef.current) {
				bgRef.current.style.transform = `translate3d(0, ${bgShift.toFixed(2)}px, 0)`;
				bgRef.current.style.willChange = 'transform';
			}
			if (contentRef.current) {
				contentRef.current.style.transform = `translate3d(0, ${contentShift.toFixed(2)}px, 0)`;
				contentRef.current.style.willChange = 'transform';
			}

			if (Math.abs(smoothProg.current - targetProg.current) > 0.001) {
				rafId.current = requestAnimationFrame(tick);
			} else {
				rafId.current = null;
			}
		};

		const start = () => {
			if (active.current) return;
			active.current = true;
			measure();
			rafId.current = requestAnimationFrame(tick);
		};

		const stop = () => {
			active.current = false;
			if (rafId.current) {
				cancelAnimationFrame(rafId.current);
				rafId.current = null;
			}
		};

		const onScrollOrResize = () => {
			measure();
			if (active.current && rafId.current === null) {
				rafId.current = requestAnimationFrame(tick);
			}
		};

		window.addEventListener('scroll', onScrollOrResize, { passive: true });
		window.addEventListener('resize', onScrollOrResize);

		if (sectionRef.current) {
			ioRef.current = new IntersectionObserver(
				(entries) => {
					for (const e of entries) {
						if (e.isIntersecting) start();
						else stop();
					}
				},
				{
					root: null,
					rootMargin: '0px 0px 0px 0px',
					threshold: 0.01
				}
			);
			ioRef.current.observe(sectionRef.current);
		} else {
			start();
		}

		measure();
		requestAnimationFrame(measure);

		return () => {
			stop();
			window.removeEventListener('scroll', onScrollOrResize);
			window.removeEventListener('resize', onScrollOrResize);
			if (ioRef.current && sectionRef.current) {
				ioRef.current.unobserve(sectionRef.current);
				ioRef.current.disconnect();
				ioRef.current = null;
			}
		};
	}, [isSingle, pathname]);

	return (
		<div ref={sectionRef} className='relative overflow-hidden py-50'>
			{!isStickyBg ? (
				<div
					ref={bgRef}
					className='absolute inset-0'
					style={
						isSingle
							? {
									minHeight: `calc(100dvh + ${EXTRA_BG_OFFSET_PX}px)`,
									bottom: `-${EXTRA_BG_OFFSET_PX}px`
								}
							: undefined
					}
				>
					{background_image?.url && !isStickyBg ? (
						<div className='h-full overflow-hidden w-full'>
							<Image src={background_image.url} alt={background_image.alt} fill className='object-cover w-full h-full will-change-transform' priority={index === 0} />
						</div>
					) : null}
					<AnimateWrapper animate_type='fade' element='div' finish_opacity={0.6} className='absolute bg-black h-full left-0 top-0 w-full pointer-events-none' threshold={0.25} />
				</div>
			) : null}

			<div className={`relative text-white${!columns ? ' text-center' : ''} min-h-[calc(100dvh+100px)] flex`} id={`parallax_column_${index}`}>
				<div className='wrapper flex flex-col gap-5 md:gap-10'>
					{columns ? (
						<div className='flex gap-6 max-md:flex-col lg:gap-16 my-auto' ref={contentRef}>
							<div className='w-full'>
								<div className='flex flex-col gap-6 md:gap-3'>
									{column_1?.subheading || column_1?.heading ? (
										<div className='flex flex-col gap-3 md:flex-col-reverse'>
											{column_1?.subheading ? <div dangerouslySetInnerHTML={{ __html: column_1.subheading }} /> : null}
											{column_1?.heading ? <h2 className='h1' dangerouslySetInnerHTML={{ __html: column_1.heading }} /> : null}
										</div>
									) : null}
									{column_1?.content ? <div dangerouslySetInnerHTML={{ __html: column_1.content }} /> : null}
									{column_1?.cta?.url ? (
										<Button link={column_1.cta} className='btn md:self-end'>
											{column_1?.cta_icon_image ? <SvgImage image={column_1.cta_icon_image} className='block w-6 lg:w-8' /> : <ArrowButtonIcon width={24} />}
										</Button>
									) : null}
								</div>
							</div>
							<div className='w-full'>
								<div className='flex flex-col gap-6 h-full md:gap-3'>
									<div className='grow'>
										{column_2?.subheading || column_2?.heading ? (
											<div className='flex flex-col gap-3 md:flex-col-reverse'>
												{column_2?.subheading ? <div dangerouslySetInnerHTML={{ __html: column_2.subheading }} /> : null}
												{column_2?.heading ? <h2 className='h1' dangerouslySetInnerHTML={{ __html: column_2.heading }} /> : null}
											</div>
										) : null}
										{column_2?.content ? <div className='text-content !text-white text-content--small' dangerouslySetInnerHTML={{ __html: column_2.content }} /> : null}
									</div>
									{column_2?.cta?.url ? (
										<Button link={column_2.cta} className='btn md:self-end'>
											{column_2?.cta_icon_image ? <SvgImage image={column_2.cta_icon_image} className='block w-6 lg:w-8' /> : <ArrowButtonIcon width={24} />}
										</Button>
									) : null}
								</div>
							</div>
						</div>
					) : (
						<div ref={contentRef} className={`flex flex-col gap-6 my-auto pb-20 ${left_position ? 'items-start text-left max-w-[600px]' : 'items-center mx-auto md:gap-8 max-w-[1060px]'}`}>
							{subheading || heading ? (
								<div className={`flex flex-col ${left_position ? 'gap-6' : 'gap-3'}`}>
									{subheading ? <div dangerouslySetInnerHTML={{ __html: subheading }} className='font-bold' /> : null}
									{heading ? <h2 className='h1' dangerouslySetInnerHTML={{ __html: heading }} /> : null}
								</div>
							) : null}
							{content ? <div className='max-w-[800px] flex flex-col gap-3' dangerouslySetInnerHTML={{ __html: content }} /> : null}
							{cta?.url ? (
								<Button link={cta} className='btn'>
									{cta_icon_image ? <SvgImage image={cta_icon_image} className='block w-6 lg:w-8' /> : <ArrowButtonIcon width={24} />}
								</Button>
							) : null}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ParallaxContentBlock;

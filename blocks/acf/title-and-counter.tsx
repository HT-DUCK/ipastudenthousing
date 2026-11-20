'use client';
import React, { useEffect, useRef, useState } from 'react';
import { AnimateWrapper } from 'wrappers';
import { ImageType } from 'lib/types';
import Image from 'next/image';

type NumberType = {
	number: string;
	icon_image: ImageType;
	description: string;
	title: string;
};

type DataType = {
	title: string;
	sec_anchor_name?: string;
	numbers: NumberType[];
	show_map?: boolean;
	map_image?: ImageType;
};

const extractNumberParts = (raw: string) => {
	const match = raw.match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/);
	if (!match) return { prefix: '', number: 0, suffix: '' };

	const [, prefix, num, suffix] = match;
	return {
		prefix,
		number: parseFloat(num),
		suffix
	};
};

const countUp = (el: HTMLElement, from: number, to: number, prefix: string, suffix: string, duration = 1000) => {
	const start = performance.now();

	const step = (timestamp: number) => {
		const progress = Math.min((timestamp - start) / duration, 1);
		const value = from + (to - from) * progress;
		el.innerText = `${prefix}${Math.floor(value)}${suffix}`;

		if (progress < 1) {
			requestAnimationFrame(step);
		} else {
			el.innerText = `${prefix}${Math.floor(to)}${suffix}`;
		}
	};

	requestAnimationFrame(step);
};

const TitleAndCounter = ({ data }: { data: DataType }) => {
	const { title, sec_anchor_name, numbers, show_map, map_image } = data || {};
	const numberRefs = useRef<(HTMLHeadingElement | null)[]>([]);
	const [hasAnimated, setHasAnimated] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries.some((entry) => entry.isIntersecting);

				if (visible && !hasAnimated) {
					numberRefs.current.forEach((el, index) => {
						if (!el) return;
						const { prefix, number, suffix } = extractNumberParts(numbers[index].number);
						countUp(el, 0, number, prefix, suffix, 2500);
					});
					setHasAnimated(true);
				}
			},
			{ threshold: 0.3 }
		);

		numberRefs.current.forEach((el) => {
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	}, [hasAnimated, numbers]);

	if (!data) return null;

	return (
		<section className={`relative z-2 bg-base-gunmetal md:min-h-[100dvh] py-10 md:py-20 text-center flex `} id={sec_anchor_name}>
			<div className={`wrapper ${!show_map ? 'my-auto' : ''}`}>
				<AnimateWrapper animate_type='fadeup' element='h2' threshold={0} className='h1 text-white'>
					<span dangerouslySetInnerHTML={{ __html: title }} />
				</AnimateWrapper>
				{map_image ? (
					<AnimateWrapper animate_type='fadeup' element='div' threshold={0} className='mt-10 md:mt-16 '>
						<Image src={map_image.url} alt={map_image.alt} width={map_image.width} height={map_image.height} />
					</AnimateWrapper>
				) : null}
				<AnimateWrapper animate_type='fadeup' element='div' threshold={0} className='flex flex-col gap-10 justify-between items-start mt-10 md:mt-16 md:flex-row'>
					{numbers.map((item, index) => (
						<div key={`numbers-${index}`} className='w-full flex flex-col gap-6 items-center'>
							{item.icon_image?.url ? (
								<span className='flex items-center justify-center w-[60px] h-[60px] rounded-full bg-main-electric-blue'>
									<Image src={item.icon_image.url} alt={item.icon_image.alt} width={item.icon_image.width} height={item.icon_image.height} />
								</span>
							) : null}
							<h3
								ref={(el) => {
									numberRefs.current[index] = el;
								}}
								className='h3 text-white'
							>
								{item.number}
							</h3>
							<div>
								{item.title ? <p className='text-base-creamtone text-base font-bold' dangerouslySetInnerHTML={{ __html: item.title }} /> : null}
								{item.description ? <p className='text-base-creamtone' dangerouslySetInnerHTML={{ __html: item.description }} /> : null}
							</div>
						</div>
					))}
				</AnimateWrapper>
			</div>
		</section>
	);
};

export default TitleAndCounter;

'use client';
import React, { useState, useEffect, useRef } from 'react';
import { ImagePositionWrapper, ParallaxBannerWrapper } from 'wrappers';
import Image from 'next/image';
import type { AlternatingRowsType } from 'lib/types';

import { Video } from 'elements';
import AlternatingRowsSticky from 'components/alternating-rows__sticky';
import AlternatingRowsContent from 'components/alternating-rows__content';
import MobileParallaxCaseBlock from 'components/mobile-parallax-case-block';
import StickyContent from 'components/sticky-content';

type DataType = {
	align_evenly: boolean;
	column_widths: string;
	custom_class?: string;
	flip_columns: boolean;
	rows: AlternatingRowsType[];
	sec_anchor_name?: string;
	swap_sizes: boolean;
	fixed_left_column: boolean;
};

const AlternatingRows = ({ data }: { data: DataType }) => {
	//__Variables
	const { align_evenly, column_widths, custom_class, flip_columns, rows, sec_anchor_name, swap_sizes, fixed_left_column } = data || {};

	const basis_1: any = {
		col_50: 'basis-[50%]',
		col_60: 'basis-[60%]',
		col_70: 'basis-[70%]'
	};

	const basis_2: any = {
		col_50: 'basis-[50%]',
		col_60: 'basis-[40%]',
		col_70: 'basis-[30%]'
	};

	const [windowSize, setWindowSize] = useState<[number, number] | null>(null);

	const refs = useRef(Array.from({ length: rows.length }, () => React.createRef<HTMLDivElement>())).current;

	useEffect(() => {
		const updateWindowSize = () => {
			setWindowSize([window.innerWidth, window.innerHeight]);
		};

		updateWindowSize();

		window.addEventListener('resize', updateWindowSize);

		return () => window.removeEventListener('resize', updateWindowSize);
	}, []);

	if (!windowSize) return null;

	return (
		<section className={`relative${custom_class ? ` ${custom_class}` : ''} z-2`} id={sec_anchor_name}>
			{rows?.length ? (
				<div>
					{fixed_left_column && windowSize[0] > 767 ? (
						<AlternatingRowsSticky rows={rows} />
					) : windowSize[0] > 767 ? (
						rows.map((item, index) => {
							const { background_color, media, text_color } = item || {};
							const { image, media_type, video } = media || {};

							const base_image = image?.mobile_image || image?.image || null;

							const main_class = align_evenly ? (flip_columns ? 'flex-row-reverse' : 'flex-row') : index % 2 === 0 ? (flip_columns ? 'flex-row-reverse' : 'flex-row') : flip_columns ? 'flex-row' : 'flex-row-reverse';

							const isReversed = main_class.includes('flex-row-reverse');

							return (
								<div key={`alternating-rows_${index}`} className={`md:flex md:min-h-[75vh] ${main_class}`} style={{ backgroundColor: background_color || '', color: text_color || '' }}>
									<div className={`flex justify-end px-5 py-10 md:px-10 ${swap_sizes ? basis_2[column_widths] : basis_1[column_widths]}`}>
										<AlternatingRowsContent item={item} isReversed={isReversed} />
									</div>
									<div className={`relative max-md:h-[400px] ${swap_sizes ? basis_1[column_widths] : basis_2[column_widths]}`}>
										{media_type === 'image' && base_image?.url ? (
											<ImagePositionWrapper className='h-full' position={image?.position}>
												<ParallaxBannerWrapper className='h-full parallax_banner' layers={[{ children: <Image src={base_image.url} alt={base_image.alt} fill className='object-cover' />, easing: [0, 0, 1, 1], shouldAlwaysCompleteAnimation: true, speed: -15, translateY: ['150px', '-150px'] }]} />
											</ImagePositionWrapper>
										) : media_type === 'video' && video ? (
											<Video video={video} />
										) : null}
									</div>
								</div>
							);
						})
					) : (
						rows.map((item, index) => {
							const nextBlockRef = refs[index + 1];
							return (
								<StickyContent key={`parallax-wrapper-${index}`}>
									<div ref={refs[index]}>
										<MobileParallaxCaseBlock key={`case-study-${index}`} item={item} nextRef={nextBlockRef} />
									</div>
								</StickyContent>
							);
						})
					)}
				</div>
			) : null}
		</section>
	);
};

export default AlternatingRows;

'use client';
import React, { useState, useCallback, useRef } from 'react';
import type { AlternatingRowsType } from 'lib/types';

import ScalableImage from 'components/scalable-image';
import AlternatingRowsContent from 'components/alternating-rows__content';

const AlternatingRowsSticky = ({ rows }: { rows: AlternatingRowsType[] }) => {
	const refLastElement = useRef<HTMLDivElement | null>(null);

	const [activeIndex, setActiveIndex] = useState(0);

	const handleActivate = useCallback((index: number) => {
		setActiveIndex((prev) => (prev !== index ? index : prev));
	}, []);

	return (
		<>
			<div className='md:flex relative bg-white'>
				<div className='sticky top-0 left-0 w-[50%] h-[100dvh] z-1 transition-colors duration-500'>
					{rows.map((item: AlternatingRowsType, index: number) => {
						const { background_color, text_color } = item || {};
						const isWhiteType = background_color ? false : true;

						return (
							<div key={`case-studies-${index}`} className={`flex justify-end min-h-[100dvh] py-10 px-5 md:px-10 absolute top-0 left-0 w-full transition-opacity duration-500 ${activeIndex === index ? 'opacity-100' : 'opacity-0 pointer-events-none'} ${isWhiteType ? 'text-gunmetal' : 'text-white'} `} style={{ backgroundColor: background_color || 'bg-white', color: text_color || '' }}>
								<AlternatingRowsContent item={item} />
							</div>
						);
					})}
				</div>
				<div className='w-[50%] overflow-hidden'>{rows.map((item, index) => (item.media.image?.image ? <ScalableImage key={`scaleble-image-${index}`} image={item.media.image?.image} id={index} onActivate={handleActivate} refLastElement={refLastElement} /> : null))}</div>
			</div>
			<div ref={refLastElement} className='h-20 absolute bottom-0 left-0 w-full' />
		</>
	);
};

export default AlternatingRowsSticky;

'use client';

import React, { useRef } from 'react';

import StickyContent from 'components/sticky-content';
import StickyParallaxBlock from 'components/sticky-parallax-block';
import { ParalaxBlockType } from 'lib/types';

const StickyParallaxBlocks = ({ parallax_blocks, isDesktop }: { parallax_blocks: ParalaxBlockType[]; isDesktop: boolean }) => {
	const refs = useRef(Array.from({ length: parallax_blocks.length }, () => React.createRef<HTMLDivElement>())).current;

	return (
		<>
			{parallax_blocks.map((item: ParalaxBlockType, index: number) => {
				const nextBlockRef = refs[index + 1];
				return (
					<StickyContent key={`parallax-wrapper-${index}`}>
						<div ref={refs[index]}>
							<StickyParallaxBlock item={item} nextRef={nextBlockRef} isDesktop={isDesktop} index={index} />
						</div>
					</StickyContent>
				);
			})}
		</>
	);
};

export default StickyParallaxBlocks;

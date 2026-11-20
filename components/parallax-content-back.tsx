'use client';

import Image from 'next/image';
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

const ParallaxContentBack = ({ blocks, visibleBackIndex, scale = 1 }: { blocks: ItemType[]; visibleBackIndex: number; scale?: number }) => (
	<div aria-hidden className='pointer-events-none fixed inset-0 z-0'>
		{blocks.map((item, i) => {
			const bg = item.background_image;
			if (!bg || i % 2 !== 1) return null;
			const isVisible = i === visibleBackIndex;

			return (
				<div
					key={`back_${i}`}
					className='absolute inset-0  will-change-transform'
					style={{
						opacity: isVisible ? 1 : 0,
						transform: isVisible ? `scale(${scale})` : 'scale(1)',
						transformOrigin: 'center center'
					}}
				>
					<Image src={bg.url} alt={bg.alt} fill className='object-cover w-full h-full' priority={i === 1} />
					<div className='absolute inset-0 bg-black/40' />
				</div>
			);
		})}
	</div>
);

export default ParallaxContentBack;

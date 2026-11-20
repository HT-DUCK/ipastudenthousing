'use client';

import { SliderWrapper } from 'wrappers';
import { ImageType } from 'lib/types';
import Image from 'next/image';
import { ArrowSlider } from 'components/svg';

type ArrowProps = {
	className?: string;
	style?: React.CSSProperties;
	onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const PrevArrow = ({ className, style, onClick }: ArrowProps) => (
	<div className='wrapper h-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-2 flex items-center justify-start pointer-events-none max-md:hidden'>
		<div className={`${className} flex items-center justify-center rotate-180  pointer-events-auto`} style={style} onClick={onClick}>
			<ArrowSlider width={20} stroke='white' />
		</div>
	</div>
);

const NextArrow = ({ className, style, onClick }: ArrowProps) => (
	<div className='wrapper h-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-2 flex items-center justify-end pointer-events-none max-md:hidden'>
		<div className={`${className} flex items-center justify-center pointer-events-auto`} style={style} onClick={onClick}>
			<ArrowSlider width={20} stroke='white' />
		</div>
	</div>
);

const SliderFull = ({ imagesList }: { imagesList: ImageType[] }) => {
	const sliderSettings = {
		slidesToShow: 1,
		className: 'default_slider slider--full',
		speed: 800,
		dots: true,
		infinite: true,
		prevArrow: <PrevArrow />,
		nextArrow: <NextArrow />
	};

	return (
		<section className='relative'>
			<SliderWrapper settings={sliderSettings}>
				{imagesList.map((item: ImageType, itemIdx: number) => (
					<div key={`slider-testimonials-${itemIdx}`}>
						<div className='min-h-[70dvh] relative'>
							<Image src={item.url} alt={item.alt} fill className='object-cover' priority={true} />
						</div>
					</div>
				))}
			</SliderWrapper>
		</section>
	);
};

export default SliderFull;

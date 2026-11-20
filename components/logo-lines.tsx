import Image from 'next/image';
import type { ImageType } from 'lib/types';
import { SliderWrapper } from 'wrappers';

const LogoLines = ({ logos_row_images }: { logos_row_images: ImageType[] }) => {
	const splitArray = <T,>(arr: T[], size: number) => {
		const result: T[][] = [];
		for (let i = 0; i < arr.length; i += size) {
			result.push(arr.slice(i, i + size));
		}
		return result;
	};

	const logoGroups = splitArray(logos_row_images, Math.ceil(logos_row_images.length / 2));
	const logoGroupsMobile = splitArray(logos_row_images, 7);

	const sliderSettings = {
		arrows: false,
		className: 'default_slider md:hidden',
		speed: 800,
		dots: true,
		infinite: true,
		responsive: [
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 1000000,
				settings: 'unslick'
			}
		] as any
	};

	if (!logos_row_images.length) return null;
	return (
		<>
			<div className='flex flex-col gap-20 max-md:hidden'>
				{logoGroups.map((group, groupIdx) => (
					<div key={groupIdx} className='whitespace-nowrap overflow-hidden w-[calc(100%+40px)] ml-[-20px]'>
						<div className='flex w-max'>
							{Array(3)
								.fill(null)
								.map((_, idx) => (
									<div key={idx} className='inline-flex gap-20 animate-move will-change-transform translate-z-0 px-10'>
										{group.map((item, index) => (
											<div key={`logo-${groupIdx}-${index}`} className='flex justify-center items-center'>
												<Image src={item.url} alt={item.alt} width={item.width} height={item.height} />
											</div>
										))}
									</div>
								))}
						</div>
					</div>
				))}
			</div>
			<SliderWrapper settings={sliderSettings}>
				{logoGroupsMobile.map((group, groupIdx) => (
					<div key={`slider-${groupIdx}`}>
						<div className='flex flex-col gap-6'>
							{group.map((item, index) => (
								<div key={`logo-${groupIdx}-${index}`} className='flex justify-center items-center'>
									<Image src={item.url} alt={item.alt} width={item.width} height={item.height} priority />
								</div>
							))}
						</div>
					</div>
				))}
			</SliderWrapper>
		</>
	);
};

export default LogoLines;

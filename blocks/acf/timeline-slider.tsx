import type { ImageType } from 'lib/types';
import { SliderWrapper, AnimateWrapper } from 'wrappers';
import Image from 'next/image';

type TimelineItemType = {
	image: ImageType;
	description: string;
	title: string;
};

type DataType = {
	title: string;
	subtitle: string;
	description: string;
	slider: TimelineItemType[];
};

const TimelineSlider = ({ data }: { data: DataType }) => {
	if (!data) return null;

	//__Variables
	const { description, title, subtitle, slider } = data || {};

	const sliderSettings = {
		arrows: slider.length > 3,
		className: `default_slider timeline_slider ${slider.length <= 3 ? 'three-blocks' : ''}`,
		speed: 800,
		dots: true,
		infinite: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					arrows: slider.length > 2
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					arrows: slider.length > 1
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: slider.length > 1
				}
			}
		]
	};
	return (
		<section className='py-10 md:py-28 relative z-2'>
			<div className='wrapper'>
				<div className='flex flex-col gap-11 md:gap-28 text-center'>
					<AnimateWrapper animate_type='fadeup' element='div' threshold={0} className='flex flex-col gap-6 max-w-[1054px] mx-auto'>
						{subtitle ? <p className='text-[12px] text-base-gunmetal/70' dangerouslySetInnerHTML={{ __html: subtitle }} /> : null}
						{title ? <h2 className='h1 text-base-gunmetal' dangerouslySetInnerHTML={{ __html: title }} /> : null}
						{description ? <p className='text-base text-base-gunmetal/70' dangerouslySetInnerHTML={{ __html: description }} /> : null}
					</AnimateWrapper>

					<SliderWrapper settings={sliderSettings}>
						{slider.map((item: TimelineItemType, index) => (
							<div key={`grey_blocks-${index}`} className='text-center px-1 md:px-5'>
								<div className='relative h-[360px] rounded-3xl overflow-hidden p-6 flex items-end'>
									<div className='absolute w-full h-full left-0 top-0 flex items-center justify-center'>
										{item.image?.url ? <Image src={item.image.url} alt={item.image.alt} width={item.image.width} height={item.image.height} className='min-h-full object-cover' /> : null}
										<div className='absolute top-0 left-0 w-full h-full bg-[linear-gradient(0deg,_#000_0%,_rgba(0,0,0,0)_100%)] opacity-50' />
									</div>
									<div className='flex flex-col gap-3 text-center text-white relative z-2'>
										<span className='text-2xl'>{item.title}</span>
										<p className='text-xs line-clamp-4'>{item.description}</p>
									</div>
								</div>
							</div>
						))}
					</SliderWrapper>
				</div>
			</div>
		</section>
	);
};

export default TimelineSlider;

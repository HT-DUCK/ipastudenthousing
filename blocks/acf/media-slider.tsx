import Image from 'next/image';
import { AnimateWrapper, SliderWrapper } from 'wrappers';
import { SliderArrow } from 'elements';
import { ImageType } from 'lib/types';

type DataType = {
	content?: string;
	custom_class?: string;
	items?: any;
	heading?: string;
	sec_anchor_name?: string;
};

type ItemType = {
	id: number;
	image?: ImageType;
};

const MediaSlider = ({ data }: { data: DataType }) => {
	//__Variables
	const { content, custom_class, items, heading, sec_anchor_name } = data || {};

	const slider_settings = {
		accessibility: true,
		arrows: true,
		dots: true,
		speed: 800,
		infinite: false,
		className: 'media_slider',
		dotsClass: 'slick-dots !mt-14',
		variableWidth: true,
		slidesToShow: 3,
		slidesToScroll: 3,
		prevArrow: <SliderArrow classes='-bottom-6 md:mr-20 md:right-0 max-md:left-5' title='Previous' />,
		nextArrow: <SliderArrow classes='-bottom-6 right-5 md:right-0' title='Next' />,
		responsive: [
			{
				breakpoint: 1600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 1020,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 768,
				settings: {
					dots: items?.length < 10,
					infinite: true,
					slidesToShow: 1,
					slidesToScroll: 1,
					centerMode: items?.length > 1,
					centerPadding: '0'
				}
			}
		]
	};

	if (!data) return null;
	return (
		<section className={`my-16 relative md:gutter-x md:my-28${custom_class ? ` ${custom_class}` : ''}`} id={sec_anchor_name}>
			<div className='inner'>
				{heading ? (
					<AnimateWrapper animate_type='fadeup' element='h2' className='mb-2 text-center md:mb-7' threshold={0}>
						<span dangerouslySetInnerHTML={{ __html: heading }} />
					</AnimateWrapper>
				) : null}
				{content ? (
					<AnimateWrapper animate_type='fadeup' element='div' className='mb-11 text-center text-[17px] md:mb-14 md:text-xl' threshold={0}>
						<span dangerouslySetInnerHTML={{ __html: content }} />
					</AnimateWrapper>
				) : null}
				{items?.length ? (
					<AnimateWrapper animate_type='fadeup' element='div' threshold={0}>
						<SliderWrapper settings={slider_settings}>
							{items.map((item: ItemType, index: number) => {
								const { image } = item || {};
								return (
									<div key={`media_slider_${index}`} className='max-md:px-1'>
										{image?.url ? (
											<div className='relative h-[260px] max-w-[82vw] w-[335px] md:h-[380px] md:w-[480px]'>
												<Image src={image.url} alt={image.alt} fill className='object-cover rounded-tr-3xl' />
											</div>
										) : null}
									</div>
								);
							})}
						</SliderWrapper>
					</AnimateWrapper>
				) : null}
			</div>
		</section>
	);
};

export default MediaSlider;

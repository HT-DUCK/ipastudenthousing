import type { ImageType } from 'lib/types';
import { SliderWrapper, AnimateWrapper } from 'wrappers';

import { StarsIcon } from 'components/svg';
import { SvgImage } from 'elements';

type TestimonialType = {
	company_logo_image: ImageType;
	name: string;
	position: string;
	review_text: string;
	stars: string;
};

type DataType = {
	title: string;
	testimonials: TestimonialType[];
	subtitle: string;
};

const ClientTestimonials = ({ data }: { data: DataType }) => {
	if (!data) return null;

	//__Variables
	const { title, subtitle, testimonials } = data || {};

	const sliderSettings = {
		arrows: false,
		className: 'default_slider dark_slider testimonials_slider',
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

	return (
		<section className='py-10 md:py-28 bg-base-gunmetal relative z-2'>
			<div className='wrapper'>
				<div className='flex flex-col gap-11 md:gap-28 text-center'>
					<AnimateWrapper animate_type='fadeup' element='div' threshold={0} className='flex flex-col gap-6 md:gap-8 max-w-[1054px] mx-auto'>
						{title ? <h2 className='h1 text-white' dangerouslySetInnerHTML={{ __html: title }} /> : null}
						{subtitle ? <p className='text-base text-base-creamtone' dangerouslySetInnerHTML={{ __html: subtitle }} /> : null}
					</AnimateWrapper>

					<AnimateWrapper animate_type='fadeup' element='div' threshold={0}>
						<SliderWrapper settings={sliderSettings}>
							{testimonials.map((item, itemIdx) => (
								<div key={`slider-testimonials-${itemIdx}`}>
									<div className='md:text-left flex flex-col gap-6 md:gap-10'>
										<div className='flex gap-1 max-md:justify-center '>
											{[...Array(5)].map((_, index) => (
												<span key={index} className={`${index < parseInt(item.stars, 10) ? 'opacity-100' : 'opacity-40'} text-base-bronze flex`}>
													<StarsIcon width={24} />
												</span>
											))}
										</div>
										{item.review_text ? <p className='h4 text-white' dangerouslySetInnerHTML={{ __html: item.review_text }} /> : null}
										<div className='flex max-md:flex-col gap-5 md:justify-start items-center'>
											<div className='flex flex-col gap-1'>
												{item.name ? <p className='text-base-bronze' dangerouslySetInnerHTML={{ __html: item.name }} /> : null}
												{item.position ? <p className='text-xs text-base-bronze' dangerouslySetInnerHTML={{ __html: item.position }} /> : null}
											</div>
											<div className='self-stretch w-[1px] bg-white-gray max-md:hidden' />
											<div className='flex max-md:justify-center'>
												<SvgImage image={item.company_logo_image} />
											</div>
										</div>
									</div>
								</div>
							))}
						</SliderWrapper>
					</AnimateWrapper>
				</div>
			</div>
		</section>
	);
};

export default ClientTestimonials;

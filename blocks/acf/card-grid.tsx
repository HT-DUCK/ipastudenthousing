import { AnimateWrapper, SliderWrapper } from 'wrappers';
import { ImageType } from 'lib/types';
import { SvgImage } from 'elements';

type ItemType = {
	content?: string;
	heading?: string;
	icon_image?: ImageType;
};

type DataType = {
	content?: string;
	custom_class?: string;
	grid?: Array<ItemType>;
	heading?: string;
	items_per_row: string | number;
	mobile_slider: boolean;
	sec_anchor_name?: string;
	subheading?: string;
};

const CardGrid = ({ data }: { data: DataType }) => {
	//__Variables
	const { content, custom_class, grid, heading, items_per_row, mobile_slider, sec_anchor_name, subheading } = data || {};
	const basis: any = {
		2: 'lg:basis-[calc(100%/2-40px/2*(2-1))]',
		3: 'lg:basis-[calc(100%/3-40px/3*(3-1))]',
		4: 'lg:basis-[calc(100%/4-40px/4*(4-1))]',
		5: 'lg:basis-[calc(100%/5-40px/5*(5-1))]'
	};

	const slider_settings = {
		accessibility: true,
		arrows: false,
		dots: true,
		speed: 800,
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: true,
		className: `card_slider lg:flex lg:flex-wrap lg:gap-10 lg:justify-center ${!mobile_slider ? 'mobilelg:flex mobilelg:flex-col mobilelg:gap-2 mobilelg:gutter-x' : ''}`,
		centerMode: true,
		centerPadding: '16px',
		dotsClass: 'slick-dots !mt-7',
		responsive: [
			{
				breakpoint: 1023,
				settings: mobile_slider ? { slidesToShow: 1, slidesToScroll: 1 } : 'unslick'
			},
			{
				breakpoint: 1000000,
				settings: 'unslick'
			}
		] as any
	};

	if (!data) return null;
	return (
		<section className={`my-16 relative lg:gutter-x md:my-28${custom_class ? ` ${custom_class}` : ''}`} id={sec_anchor_name}>
			<div className='inner'>
				<div className='gutter-x'>
					{subheading ? (
						<AnimateWrapper animate_type='fadeup' element='div' className='subheading' threshold={0}>
							<span dangerouslySetInnerHTML={{ __html: subheading }} />
						</AnimateWrapper>
					) : null}
					{heading ? (
						<AnimateWrapper animate_type='fadeup' element='h2' className='mb-4 text-center md:mb-9' threshold={0}>
							<span dangerouslySetInnerHTML={{ __html: heading }} />
						</AnimateWrapper>
					) : null}
					{content ? (
						<AnimateWrapper animate_type='fadeup' element='div' className='mb-10 text-center text-[17px] md:mb-20 md:text-xl' threshold={0}>
							<span dangerouslySetInnerHTML={{ __html: content }} />
						</AnimateWrapper>
					) : null}
				</div>
				{grid?.length ? (
					<AnimateWrapper animate_type='fadeup' element='div' threshold={0}>
						<SliderWrapper settings={slider_settings}>
							{grid?.map((item: ItemType, index: number) => {
								const { content, heading, icon_image } = item || {};

								return (
									<div key={`card_grid_${index}`} className={`bg-primary p-8 rounded-tr-3xl text-center text-white ${basis[items_per_row]} mobilelg:h-full`}>
										{icon_image?.url ? (
											<div className='bg-black h-10 inline-flex items-center justify-center mb-4 rounded-full w-10'>
												<SvgImage image={icon_image} className='inline-block w-6' />
											</div>
										) : null}
										{heading ? <h3 className='mb-4' dangerouslySetInnerHTML={{ __html: heading }} /> : null}
										{content ? <div className='break-words text-xl' dangerouslySetInnerHTML={{ __html: content }} /> : null}
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

export default CardGrid;

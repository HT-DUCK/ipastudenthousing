import { Button, SvgImage } from 'elements';
import { AnimateWrapper, SliderWrapper } from 'wrappers';
import HeroMedia from './media';
import { ImageType, LinkType, MediaType } from 'lib/types';

type DataType = {
	background_color: string;
	center_content?: boolean;
	content?: string;
	content_columns: boolean;
	content_column_1?: string;
	content_column_2?: string;
	content_max_width: number;
	ctas: Array<{
		cta: LinkType;
		cta_style: string;
		cta_icon_image: ImageType;
	}>;
	custom_class?: string;
	heading?: string;
	height: string;
	media: Array<MediaType>;
	scale?: boolean;
	sec_anchor_name?: string;
	subheading?: string;
	text_color: string;
};

const Hero = ({ data }: { data: DataType }) => {
	//__Variables
	const { background_color, center_content, content, content_columns, content_column_1, content_column_2, content_max_width, ctas, custom_class, heading, height, media, scale, sec_anchor_name, subheading, text_color } = data || {};
	const height_options: any = {
		100: 'h-svh',
		75: 'h-[75svh]',
		50: 'h-[50svh]',
		25: 'h-[25svh]',
		0: 'h-auto'
	};

	const sliderSettings = {
		arrows: false,
		autoplay: true,
		autoplaySpeed: 5000,
		className: 'hero_slider',
		fade: true,
		pauseOnHover: false,
		speed: 800
	};

	const inlineStyles = {
		content: {
			color: text_color || '',
			maxWidth: content_max_width ? `${content_max_width}px` : ''
		},
		hero: {
			backgroundColor: background_color || '#000'
		}
	};

	if (!data) return null;
	return (
		<section className={`relative ${scale ? '' : 'gutter-x'} ${height_options[height]}${custom_class ? ` ${custom_class}` : ''}`} style={inlineStyles.hero} id={sec_anchor_name}>
			{media?.length ? (
				<div className={`media ${scale ? '' : 'absolute h-full left-0 top-0 w-full'}`}>
					{media.length > 1 ? (
						<SliderWrapper settings={sliderSettings}>
							{media.map((item, index) => (
								<HeroMedia key={`hero_media_${index}`} scale={scale} item={item} />
							))}
						</SliderWrapper>
					) : (
						media.map((item, index) => <HeroMedia key={`hero_media_${index}`} scale={scale} item={item} />)
					)}
				</div>
			) : null}
			{!background_color ? (
				<>
					<div className='absolute bg-[linear-gradient(180deg,rgba(0,0,0,0.65)_-101.57%,rgba(0,0,0,0.00)100%)] h-[300px] left-0 top-0 w-full' />
					{!scale ? <div className='absolute bg-[linear-gradient(0deg,rgba(0,0,0,0.65)_-101.57%,rgba(0,0,0,0.00)100%)] h-[60%] bottom-0 left-0 w-full' /> : null}
				</>
			) : null}
			<div className={`flex flex-col h-full inner justify-end pt-24 pb-8 text-white md:pb-10 md:pt-48 ${scale ? 'absolute bottom-0' : 'relative'}`}>
				<AnimateWrapper animate_type='fade' className={`opacity-0${center_content ? ' mx-auto text-center' : ''}`} element='div' style={inlineStyles.content} threshold={0}>
					<div className={`${center_content ? ' max-lg:mx-auto' : ''}`}>
						{subheading ? <div className={`${center_content ? ' text-center' : ''}`} dangerouslySetInnerHTML={{ __html: subheading }} /> : null}
						{heading ? <h1 className={`${center_content ? 'text-center' : ''}`} dangerouslySetInnerHTML={{ __html: heading }} /> : null}
					</div>
					{content_columns ? (
						<div className={`flex font-normal gap-10 leading-[1.33] mt-3 text-2xl tracking-[-0.8px] md:mt-9 md:text-3xl max-md:flex-col max-md:gap-3${center_content ? ' text-center' : ''}`}>
							{content_column_1 ? <div dangerouslySetInnerHTML={{ __html: content_column_1 }} /> : null}
							{content_column_2 ? <div dangerouslySetInnerHTML={{ __html: content_column_2 }} /> : null}
						</div>
					) : content ? (
						<div className={`font-normal leading-[1.33] mt-3 text-2xl tracking-[-0.8px] md:mt-9 md:text-3xl${center_content ? ' mx-auto text-center' : ''}`} dangerouslySetInnerHTML={{ __html: content }} />
					) : null}
					{ctas ? (
						<div className='mt-5 md:mt-9'>
							{ctas.map(
								(cta, index) =>
									cta.cta.url && (
										<Button key={`hero_cta-${index}`} link={cta.cta} className={`btn ${cta.cta_style}`}>
											{cta?.cta_icon_image ? <SvgImage image={cta.cta_icon_image} className='block' /> : null}
										</Button>
									)
							)}
						</div>
					) : null}
				</AnimateWrapper>
			</div>
		</section>
	);
};

export default Hero;

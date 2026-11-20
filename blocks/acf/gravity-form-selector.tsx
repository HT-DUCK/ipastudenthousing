import { Suspense } from 'react';
import { AnimateWrapper, ParallaxBannerWrapper } from 'wrappers';
import GravityForm from 'gravity-forms';
import Image from 'next/image';
import { LoadingSVG } from 'elements/assets';
import { GravityFormsType, ImageType } from 'lib/types';

type DataType = {
	background_image?: ImageType;
	content?: string;
	custom_class?: string;
	form: GravityFormsType;
	heading?: string;
	layout_options?: 'narrow';
	sec_anchor_name?: string;
	show_form_description?: boolean;
	show_form_title?: boolean;
	subheading?: string;
	text_align: 'center' | 'left';
	text_color?: string;
};

const GravityFormSelector = ({ data }: { data: DataType }) => {
	//__Variables
	const { background_image, content, custom_class, form, heading, layout_options, sec_anchor_name, show_form_description, show_form_title, subheading, text_align, text_color } = data || {};

	if (!data) return null;
	return (
		<section className={`relative ${background_image?.url ? `mt-10 max-md:pb-16 max-md:pt-24 md:py-28` : 'max-md:mb-16 max-md:mt-24 md:my-28'}${custom_class ? ` ${custom_class}` : ''}`} style={{ color: text_color || '', textAlign: text_align }} id={sec_anchor_name}>
			{background_image?.url ? (
				<div className='absolute h-full w-full top-0'>
					<ParallaxBannerWrapper className='h-full parallax_banner' layers={[{ children: <Image src={background_image.url} alt={background_image.alt} fill className='object-cover' />, easing: [0, 0, 1, 1], shouldAlwaysCompleteAnimation: true, speed: -15 }]} />
				</div>
			) : null}
			<div className='gutter-x'>
				<div className={`inner relative ${layout_options === 'narrow' ? '!max-w-[600px]' : '!max-w-[800px]'}`}>
					<AnimateWrapper animate_type='fadeup' element='div' className='text-center' threshold={0}>
						{subheading ? <div className='subheading' dangerouslySetInnerHTML={{ __html: subheading }} /> : null}
						{heading ? <h2 className='mb-5 md:mb-7' dangerouslySetInnerHTML={{ __html: heading }} /> : null}
						{content ? <div className='mb-8 md:mb-10' dangerouslySetInnerHTML={{ __html: content }} /> : null}
					</AnimateWrapper>
					{form ? (
						<AnimateWrapper animate_type='fadeup' element='div' className='form' threshold={0}>
							<Suspense fallback={<LoadingSVG width={80} />}>
								<GravityForm field_className={text_align === 'center' ? 'justify-center' : ''} form={form} show_form_description={show_form_description} show_form_title={show_form_title} />
							</Suspense>
						</AnimateWrapper>
					) : null}
				</div>
			</div>
		</section>
	);
};

export default GravityFormSelector;

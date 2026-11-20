import { Button, SvgImage } from 'elements';
import { AnimateWrapper } from 'wrappers';
import Image from 'next/image';
import { ImageType, LinkType } from 'lib/types';
import { ArrowButtonIcon } from 'components/svg';

type DataType = {
	background_color?: string;
	center_content?: boolean;
	content?: string;
	cta: LinkType;
	cta_icon_image?: ImageType;
	custom_class?: string;
	heading?: string;
	heading_color?: string;
	heading_tag: string;
	image?: ImageType;
	image_max_width?: string;
	image_placement?: 'before' | 'after';
	layout?: 'narrow';
	max_width?: string;
	sec_anchor_name?: string;
	subheading?: string;
	text_color?: string;
};

const RegularContent = ({ data }: { data: DataType }) => {
	//__Variables
	const { background_color, center_content, content, cta, cta_icon_image, custom_class, heading, heading_color, heading_tag, image, image_max_width, image_placement, max_width, sec_anchor_name, subheading, text_color } = data || {};

	//__Inline Styles
	const inlineStyles = {
		section: {
			backgroundColor: background_color || '',
			color: text_color || '',
			textAlign: center_content ? ('center' as 'center') : undefined
		},
		image: {
			maxWidth: image_max_width || ''
		},
		inner: {
			maxWidth: max_width || ''
		},
		heading: {
			color: heading_color || ''
		},
		content: {
			color: text_color || '',
			textAlign: center_content ? ('center' as 'center') : undefined
		}
	};

	if (!data) return null;
	return (
		<section id={sec_anchor_name} className={`pb-10 md:pb-28 ${custom_class ? ` ${custom_class}` : ''}`} style={inlineStyles.section}>
			<div className='wrapper wrapper-sm'>
				<div className={`flex flex-col gap-6 md:gap-10 ${center_content ? 'items-center' : 'items-start'}`} style={inlineStyles.inner}>
					{image?.url && image_placement === 'before' ? (
						<div className='inner'>
							<AnimateWrapper animate_type='fadeup' className='mx-auto' element='div' style={inlineStyles.image} threshold={0}>
								<Image src={image.url} alt={image.alt} height={image.height} width={image.width} className='mx-auto' />
							</AnimateWrapper>
						</div>
					) : null}
					{subheading ? (
						<AnimateWrapper animate_type='fadeup' element='div' threshold={0}>
							<span dangerouslySetInnerHTML={{ __html: subheading }} />
						</AnimateWrapper>
					) : null}
					{heading ? (
						<AnimateWrapper animate_type='fadeup' element={heading_tag} style={inlineStyles.heading} threshold={0}>
							<span dangerouslySetInnerHTML={{ __html: heading }} />
						</AnimateWrapper>
					) : null}
					{content ? (
						<AnimateWrapper animate_type='fadeup' className='text-content' element='div' threshold={0} style={inlineStyles.content}>
							<div dangerouslySetInnerHTML={{ __html: content }} />
						</AnimateWrapper>
					) : null}
					{image?.url && image_placement === 'after' ? (
						<AnimateWrapper animate_type='fadeup' className='mx-auto' element='div' style={inlineStyles.image} threshold={0}>
							<Image src={image.url} alt={image.alt} height={image.height} width={image.width} className='mx-auto rounded-3xl' />
						</AnimateWrapper>
					) : null}
					{cta?.url ? (
						<AnimateWrapper animate_type='fadeup' className='text-center max-md:w-full' element='div' threshold={0}>
							<Button link={cta} className='btn max-md:w-full'>
								{cta_icon_image ? <SvgImage image={cta_icon_image} className='block w-6 lg:w-8' /> : <ArrowButtonIcon width={24} />}
							</Button>
						</AnimateWrapper>
					) : null}
				</div>
			</div>
		</section>
	);
};

export default RegularContent;

import { ImageType, LinkType } from 'lib/types';
import { AnimateWrapper, ParallaxBannerWrapper } from 'wrappers';
import Image from 'next/image';

import { Button } from 'elements';
import { ArrowButtonIcon } from 'components/svg';

type DataType = {
	sec_anchor_name?: string;
	image: ImageType;
	title: string;
	description: string;
	link: LinkType;
};

const PostItemFullscreen = ({ data }: { data: DataType }) => {
	const { sec_anchor_name, description, image, title, link } = data || {};

	return (
		<section className='relative' id={sec_anchor_name}>
			<div className='flex w-full max-md:flex-col'>
				<div className='flex py-10 px-5 md:px-10 text-base-gunmetal w-full'>
					<AnimateWrapper animate_type='fadeup' element='div' threshold={0} className='max-w-[640px] flex flex-col items-start justify-end mt-auto '>
						<h2 className='h2' dangerouslySetInnerHTML={{ __html: title }} />
						<p className='text-base text-opacity-70 mt-6 md:mt-8' dangerouslySetInnerHTML={{ __html: description }} />
						<Button link={link} className='btn mt-10 max-sm:w-full max-sm:justify-center'>
							<ArrowButtonIcon width={24} />
						</Button>
					</AnimateWrapper>
				</div>
				<ParallaxBannerWrapper className='relative w-full overflow-hidden pt-[109%] md:pt-[55.556%]' layers={[{ children: <Image src={image.url} alt={image.alt} fill className='object-cover' />, easing: [0, 0, 1, 1], shouldAlwaysCompleteAnimation: true, speed: -5, translateY: ['50px', '-50px'] }]} />
			</div>
		</section>
	);
};

export default PostItemFullscreen;

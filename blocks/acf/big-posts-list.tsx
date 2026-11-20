import { AnimateWrapper, ParallaxBannerWrapper } from 'wrappers';
import { ImageType, PageType } from 'lib/types';
import Image from 'next/image';

import { Button } from 'elements';
import { ArrowButtonIcon } from 'components/svg';

type PostType = PageType & {
	acf: {
		image: ImageType;
		text_above_title: string;
		short_description: string;
	};
};

type DataType = {
	sec_anchor_name?: string;
	posts: PostType[];
};

const BigPostsList = async ({ data }: { data: DataType }) => {
	if (!data) return null;

	//__Variables
	const { sec_anchor_name, posts } = data || {};

	return (
		<section id={sec_anchor_name}>
			<div>
				{posts?.map((item: PageType) => {
					const { id, post_title, acf } = item || {};
					const { image, text_above_title, short_description } = acf || {};
					return (
						<div key={`big-posts-list-${id}`} className='relative text-white min-h-[100dvh] overflow-hidden py-10 md:py-20 flex items-end'>
							<div className='absolute w-full h-full top-0 left-0'>
								<ParallaxBannerWrapper className='relative w-full h-full' layers={[{ children: <Image src={image.url} alt={image.alt} fill className='object-cover' />, easing: [0, 0, 1, 1], shouldAlwaysCompleteAnimation: true, speed: -5, translateY: ['-75px', '75px'] }]} />
							</div>
							<div className='absolute top-0 left-0 w-full h-full bg-[linear-gradient(0deg,_#000_0%,_rgba(0,0,0,0)_100%)] z-2 pointer-events-none opacity-80' />
							<div className='flex wrapper relative z-3 gap-6 md:gap-10 max-w-[1320px] justify-between max-md:flex-col '>
								<AnimateWrapper animate_type='fadeup' element='div' threshold={0} className='flex flex-col gap-6 md:gap-3 max-w-[600px] w-full'>
									{post_title ? <h2 className='h1 max-md:order-1' dangerouslySetInnerHTML={{ __html: post_title }} /> : null}
									{text_above_title ? <p className='text-base' dangerouslySetInnerHTML={{ __html: text_above_title }} /> : null}
								</AnimateWrapper>
								<AnimateWrapper animate_type='fadeup' element='div' threshold={0} className='flex flex-col gap-6 justify-between items-end max-w-[600px] w-full'>
									{short_description ? <div className='text-base text-opacity-70' dangerouslySetInnerHTML={{ __html: short_description }} /> : null}
									<Button link={{ title: 'Learn More', url: item.relative_path }} className='btn max-sm:w-full max-sm:justify-center'>
										<ArrowButtonIcon width={24} />
									</Button>
								</AnimateWrapper>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default BigPostsList;

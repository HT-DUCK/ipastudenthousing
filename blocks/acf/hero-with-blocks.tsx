import Image from 'next/image';
import { ImageType, LinkType } from 'lib/types';

import HeroWithParallaxBlocks from 'components/hero-with-parallax-blocks';
import { ParalaxBlockType } from 'lib/types';

type DataType = {
	custom_class?: string;
	sec_anchor_name?: string;
	center_images?: boolean;
	background_image: ImageType;
	parallax_blocks: ParalaxBlockType[];
	title: string;
	description: string;
	hero_button: LinkType;
};

const HeroWithBlocks = async ({ data }: { data: DataType }) => {
	if (!data) return null;

	//__Variables
	const { background_image, title, description, hero_button, sec_anchor_name, parallax_blocks } = data || {};

	return (
		<section className='min-h-[100dvh] md:pb-10' id={sec_anchor_name}>
			<div className='fixed top-0 left-0 w-full h-full z-1 '>
				<Image src={background_image.url} alt={background_image.alt} fill className='object-cover' />
				<div className='absolute top-0 left-0 w-full h-full z-1 bg-black opacity-40' />
			</div>
			<div className='px-0 wrapper md:px-5  relative z-2 '>
				<HeroWithParallaxBlocks title={title} description={description} hero_button={hero_button} parallax_blocks={parallax_blocks} />
			</div>
		</section>
	);
};

export default HeroWithBlocks;

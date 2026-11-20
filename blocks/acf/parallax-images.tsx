import Image from 'next/image';
import { ParallaxBannerWrapper } from 'wrappers';
import { ImageType } from 'lib/types';

type DataType = {
	custom_class?: string;
	sec_anchor_name?: string;
	images?: Array<ImageType>;
};

const ParallaxImages = ({ data }: { data: DataType }) => {
	//__Variables
	const { custom_class, sec_anchor_name, images } = data || {};

	if (!data) return null;
	return (
		<section className={`${custom_class ? ` ${custom_class}` : ''}`} id={sec_anchor_name}>
			{images?.length ? (
				<div className=''>
					{images.map((image) => {
						if (!image?.id || !image?.url) return null;
						return <ParallaxBannerWrapper key={`images_${image.id}`} style={{ height: '90vh' }} className='parallax_banner' layers={[{ children: <Image src={image.url} alt={image.alt} fill className='object-cover' />, easing: [0, 0, 1, 1], shouldAlwaysCompleteAnimation: true, speed: -15 }]} />;
					})}
				</div>
			) : null}
		</section>
	);
};

export default ParallaxImages;

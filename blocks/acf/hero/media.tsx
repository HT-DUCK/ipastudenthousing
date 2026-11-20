import Image from 'next/image';
import { ImagePositionWrapper, ParallaxBannerWrapper } from 'wrappers';
import { ResponsiveElement, Video } from 'elements';
import { MediaType } from 'lib/types';

const HeroMedia = ({ item, scale }: { item: MediaType; scale?: boolean }) => {
	//__Variables
	const { image, media_type, overlay, video } = item || {};

	const base_image = image?.mobile_image || image?.image || null;

	const base_element = base_image ? scale ? <Image src={base_image.url} alt={base_image.alt} height={base_image.height} width={base_image.width} priority placeholder='blur' blurDataURL={base_image.medium || base_image.url} className='w-full' /> : <ParallaxBannerWrapper className='h-full parallax_banner' layers={[{ children: <Image src={base_image.url} alt={base_image.alt} fill priority placeholder='blur' blurDataURL={base_image.medium || base_image.url} className='object-cover opacity-70' />, easing: [0, 0, 1, 1], shouldAlwaysCompleteAnimation: true, speed: -25, translateY: ['-75px', '75px'] }]} /> : null;

	const md_element = image?.image ? scale ? <Image src={image.image.url} alt={image.image.alt} height={image.image.height} width={image.image.width} priority placeholder='blur' blurDataURL={image.image.medium || image.image.url} className='w-full' /> : <ParallaxBannerWrapper className='h-full parallax_banner' layers={[{ children: <Image src={image.image.url} alt={image.image.alt} fill priority placeholder='blur' blurDataURL={image.image.medium || image.image.url} className='object-cover opacity-70' />, easing: [0, 0, 1, 1], shouldAlwaysCompleteAnimation: true, speed: -25, translateY: ['-75px', '75px'] }]} /> : null;

	//__Inline Styles
	const inlineStyles = {
		overlay: {
			backgroundColor: overlay || ''
		}
	};

	if (!item) return null;
	return (
		<div className={`h-full ${scale ? '2xl:min-h-screen max-md:min-h-[50vh]' : ''}`}>
			{media_type === 'image' && image?.image?.url ? (
				<ImagePositionWrapper className='h-full' position={image.position}>
					<ResponsiveElement base={base_element} md={md_element} />
				</ImagePositionWrapper>
			) : media_type === 'video' && video ? (
				<Video video={video} />
			) : null}
			<div className='' style={inlineStyles.overlay} />
		</div>
	);
};
export default HeroMedia;

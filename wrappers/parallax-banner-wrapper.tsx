'use client';
import { BannerLayer, ParallaxBanner, ParallaxProvider } from 'react-scroll-parallax';

const ParallaxBannerWrapper = ({ className, layers, style }: { className?: string; layers: BannerLayer[]; style?: React.CSSProperties }) => (
	<ParallaxProvider>
		<ParallaxBanner className={className} layers={layers} style={style} />
	</ParallaxProvider>
);

export default ParallaxBannerWrapper;

//ACF Blocks
import AlternatingRows from './acf/alternating-rows';
import AccordionContent from './acf/accordion-content';
import CardGrid from './acf/card-grid';
import Contact from './acf/contact';
import ContentGrid from './acf/content-grid';
import EmbeddedMap from './acf/embedded-map';
import Events from './acf/events';
import GravityFormSelector from './acf/gravity-form-selector';
import Images from './acf/images';
import InteractiveMap from './acf/interactive-map';
import MediaSlider from './acf/media-slider';
import News from './acf/news';
import ParallaxContent from './acf/parallax-content';
import ParallaxImages from './acf/parallax-images';
import PeopleGrid from './acf/people-grid';
import RegularContent from './acf/regular-content';

import HeroWithBlocks from './acf/hero-with-blocks';
import RecentCaseStudies from './acf/recent-case-studies';
import TitleAndCounter from './acf/title-and-counter';
import CompanyLogos from './acf/company-logos';
import ClientTestimonials from './acf/client-testimonials';
import HeroText from './acf/hero-text';
import Properties from './acf/properties';
import ContentBlock from './acf/content-block';
import PostItemFullscreen from './acf/post-item-fullscreen';
import BigPostsList from './acf/big-posts-list';
import TimelineSlider from './acf/timeline-slider';
import CoreValues from './acf/core-values';

//Core Blocks
import CoreBlock from 'blocks/core';

const Blocks = ({ blocks, page_type, animate = true }: { blocks: any[]; page_type?: string; animate?: boolean }) => {
	if (!blocks) return null;

	return (
		<>
			{blocks.map((block, index) => {
				switch (block.blockName) {
					/*ACF Blocks*/
					case 'acf/core-values':
						return <CoreValues key={`${block.attrs.id}-${index}`} data={block.attrs.data} />;
					case 'acf/timeline-slider':
						return <TimelineSlider key={`${block.attrs.id}-${index}`} data={block.attrs.data} />;
					case 'acf/alternating-rows':
						return <AlternatingRows key={`${block.attrs.id}-${index}`} data={block.attrs.data} />;
					case 'acf/hero-with-blocks':
						return <HeroWithBlocks key={`${block.attrs.id}-${index}`} data={block.attrs.data} />;
					case 'acf/recent-case-studies':
						return <RecentCaseStudies key={`${block.attrs.id}-${index}`} data={block.attrs.data} />;
					case 'acf/title-and-counter':
						return <TitleAndCounter key={`${block.attrs.id}-${index}`} data={block.attrs.data} />;
					case 'acf/company-logos':
						return <CompanyLogos key={`${block.attrs.id}-${index}`} data={block.attrs.data} />;
					case 'acf/client-testimonials':
						return <ClientTestimonials key={`${block.attrs.id}-${index}`} data={block.attrs.data} />;
					case 'acf/hero-text':
						return <HeroText key={`${block.attrs.id}-${index}`} data={block.attrs.data} />;
					case 'acf/hero-innerpage':
						return <HeroText key={`${block.attrs.id}-${index}`} data={block.attrs.data} />;
					case 'acf/properties-with-filter':
						return <Properties key={`${block.attrs.id}-${index}`} data={block.attrs.data} />;
					case 'acf/content-block':
						return <ContentBlock key={`${block.attrs.id}-${index}`} data={block.attrs.data} />;
					case 'acf/post-item-fullscreen':
						return <PostItemFullscreen key={`${block.attrs.id}-${index}`} data={block.attrs.data} />;
					case 'acf/big-posts-list':
						return <BigPostsList key={`${block.attrs.id}-${index}`} data={block.attrs.data} />;
					case 'acf/accordion-content':
						return <AccordionContent key={`${block.attrs.id}-${index}`} data={block.attrs.data} />;
					case 'acf/card-grid':
						return <CardGrid key={`${block.attrs.id}-${index}`} data={block.attrs.data} />;
					case 'acf/contact':
						return <Contact key={`${block.attrs.id}-${index}`} data={block.attrs.data} />;
					case 'acf/content-grid':
						return <ContentGrid key={`${block.attrs.id}-${index}`} data={block.attrs.data} />;
					case 'acf/embedded-map':
						return <EmbeddedMap key={`${block.attrs.id}-${index}`} data={block.attrs.data} />;
					case 'acf/events':
						return <Events key={`${block.attrs.id}-${index}`} data={block.attrs.data} />;
					case 'acf/gravity-form-selector':
						return <GravityFormSelector key={`${block.attrs.id}-${index}`} data={block.attrs.data} />;
					case 'acf/images':
						return <Images key={`${block.attrs.id}-${index}`} data={block.attrs.data} />;
					case 'acf/interactive-map':
						return <InteractiveMap key={`${block.attrs.id}-${index}`} data={block.attrs.data} />;
					case 'acf/media-slider':
						return <MediaSlider key={`${block.attrs.id}-${index}`} data={block.attrs.data} />;
					case 'acf/news':
						return <News key={`${block.attrs.id}-${index}`} data={block.attrs.data} />;
					case 'acf/parallax-content':
						return <ParallaxContent key={`${block.attrs.id}-${index}`} data={block.attrs.data} />;
					case 'acf/people-grid':
						return <PeopleGrid key={`${block.attrs.id}-${index}`} data={block.attrs.data} />;
					case 'acf/parallax-images':
						return <ParallaxImages key={`${block.attrs.id}-${index}`} data={block.attrs.data} />;
					case 'acf/regular-content':
						return <RegularContent key={`${block.attrs.id}-${index}`} data={block.attrs.data} />;

					/*Core Blocks*/
					default:
						return <CoreBlock key={`${block.id}-${index}`} block={block} page_type={page_type} animate={animate} />;
				}
			})}
		</>
	);
};

export default Blocks;

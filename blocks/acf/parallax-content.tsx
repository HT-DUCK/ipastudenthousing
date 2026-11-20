import { ImageType, LinkType } from 'lib/types';
import ParallaxContentTabs from 'components/parallax-content-tabs';
import ParallaxContentContainer from 'components/parallax-content-container';

type ItemType = {
	background_image?: ImageType;
	columns: boolean;
	left_position?: boolean;
	column_1?: {
		content?: string;
		cta?: LinkType;
		cta_icon_image?: ImageType;
		heading?: string;
		subheading?: string;
	};
	column_2?: {
		content?: string;
		cta?: LinkType;
		cta_icon_image?: ImageType;
		heading?: string;
		subheading?: string;
	};
	content?: string;
	cta?: LinkType;
	cta_icon_image?: ImageType;
	heading?: string;
	subheading?: string;
};

type DataType = {
	blocks?: Array<ItemType>;
	custom_class?: string;
	sec_anchor_name?: string;
	show_navigation_tabs?: boolean;
};

const HEADER_OFFSET = 0;
const BOTTOM_OFFSET = 0;

const ParallaxContent = ({ data }: { data: DataType }) => {
	//__Variables
	const { blocks, custom_class, sec_anchor_name, show_navigation_tabs } = data || {};

	if (!data || !blocks?.length) return null;
	return (
		<section className={`relative${custom_class ? ` ${custom_class}` : ''}`} id={sec_anchor_name}>
			{show_navigation_tabs ? <ParallaxContentTabs blocks={blocks} sectionId={sec_anchor_name} headerOffset={HEADER_OFFSET} bottomOffset={BOTTOM_OFFSET} /> : null}
			<ParallaxContentContainer blocks={blocks} />
		</section>
	);
};

export default ParallaxContent;

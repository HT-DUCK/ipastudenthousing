import CoreWrapper from './wrapper';
import { CoreBlockType } from 'lib/types';

const CoreEmbed = ({ data, page_type, animate = true }: { data: CoreBlockType; page_type?: string; animate?: boolean }) => {
	//__Variables
	const { attrs } = data || {};
	const { url } = attrs || {};

	if (!data || !url) return null;
	return (
		<CoreWrapper animate_type={animate ? 'fadeup' : undefined} attrs={attrs} element='div' element_class='wp_embed' page_type={page_type}>
			<iframe src={url} title={`embed-${data.id}`} referrerPolicy='strict-origin-when-cross-origin' allowFullScreen />
		</CoreWrapper>
	);
};

export default CoreEmbed;

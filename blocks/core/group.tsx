import Blocks from '../';
import CoreWrapper from './wrapper';
import { CoreBlockType } from 'lib/types';

const CoreGroup = ({ data, page_type, animate = true }: { data: CoreBlockType; page_type?: string; animate: boolean }) => {
	//__Variables
	const { attrs, innerBlocks } = data || {};

	if (!data) return null;
	return (
		<CoreWrapper attrs={attrs} element='div' element_class='wp_group' page_type={page_type}>
			<Blocks blocks={innerBlocks} page_type={page_type} animate={animate} />
		</CoreWrapper>
	);
};

export default CoreGroup;

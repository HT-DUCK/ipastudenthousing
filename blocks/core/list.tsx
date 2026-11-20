import CoreWrapper from './wrapper';
import CoreListItem from './list-item';
import { CoreBlockType } from 'lib/types';

const CoreList = ({ data, page_type, animate = true }: { data: CoreBlockType; page_type?: string; animate?: boolean }) => {
	//__Variables
	const { attrs, innerBlocks } = data || {};
	const { ordered, reversed, start, type } = attrs || {};

	const count = innerBlocks?.length;
	const element = ordered ? 'ol' : 'ul';

	if (!data || !count || count <= 0) return null;
	return (
		<CoreWrapper animate_type={animate ? 'fadeup' : undefined} attrs={attrs} element={element} element_class='wp_list' element_styles={type ? [{ listStyleType: type }] : undefined} element_attrs={{ reversed: reversed || false, start: start || 1 }} page_type={page_type}>
			{innerBlocks.map((item: any, index: number) => (
				<CoreListItem key={`${data.id}-${index}`} data={item} />
			))}
		</CoreWrapper>
	);
};

export default CoreList;

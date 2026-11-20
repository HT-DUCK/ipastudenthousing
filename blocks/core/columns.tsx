import CoreWrapper from './wrapper';
import CoreColumn from './column';
import { CoreBlockType } from 'lib/types';

const CoreColumns = ({ data, page_type, animate = true }: { data: CoreBlockType; page_type?: string; animate?: boolean }) => {
	//__Variables
	const { attrs, innerBlocks } = data || {};

	const count = innerBlocks?.length;

	if (!data || !count || count <= 0) return null;
	return (
		<CoreWrapper attrs={attrs} element='div' element_class='wp_columns' element_styles={[{ columns: count }]} page_type={page_type}>
			{innerBlocks.map((item: any, index: number) => (
				<CoreColumn key={`${data.id}-${index}`} data={item} page_type={page_type} animate={animate} />
			))}
		</CoreWrapper>
	);
};

export default CoreColumns;

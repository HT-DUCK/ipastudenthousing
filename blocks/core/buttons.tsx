import CoreWrapper from './wrapper';
import CoreButton from './button';
import { CoreBlockType } from 'lib/types';

const CoreButtons = ({ data, page_type, animate = true }: { data: CoreBlockType; page_type?: string; animate?: boolean }) => {
	//__Variables
	const { attrs, innerBlocks } = data || {};

	const count = innerBlocks?.length;

	if (!data || !count || count <= 0) return null;
	return (
		<CoreWrapper animate_type={animate ? 'fadeup' : undefined} attrs={attrs} element='div' element_class='wp_buttons flex' page_type={page_type}>
			{innerBlocks.map((item: any, index: number) => (
				<CoreButton key={`${data.id}-${index}`} data={item} />
			))}
		</CoreWrapper>
	);
};

export default CoreButtons;

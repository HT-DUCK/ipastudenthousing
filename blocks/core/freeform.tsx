import parse from 'html-react-parser';
import CoreWrapper from './wrapper';
import { CoreBlockType } from 'lib/types';

const CoreFreeform = ({ data, page_type, animate = true }: { data: CoreBlockType; page_type?: string; animate?: boolean }) => {
	//__Variables
	const { innerHTML } = data || {};

	if (!data || !innerHTML) return null;
	return (
		<CoreWrapper animate_type={animate ? 'fadeup' : undefined} element='div' element_class='wp_freeform' page_type={page_type}>
			{parse(innerHTML)}
		</CoreWrapper>
	);
};

export default CoreFreeform;

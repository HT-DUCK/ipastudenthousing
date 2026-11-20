import CoreWrapper from './wrapper';
import { CoreBlockType } from 'lib/types';

const CoreSeparator = ({ data, page_type, animate = true }: { data: CoreBlockType; page_type?: string; animate?: boolean }) => {
	//__Variables
	const { attrs } = data || {};

	if (!data) return null;
	return <CoreWrapper animate_type={animate ? 'fadeup' : undefined} attrs={attrs} element='hr' element_class='wp_separator' page_type={page_type} />;
};

export default CoreSeparator;

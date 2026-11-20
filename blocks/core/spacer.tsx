import CoreWrapper from './wrapper';
import { CoreBlockType } from 'lib/types';

const CoreSpacer = ({ data, page_type, animate = true }: { data: CoreBlockType; page_type?: string; animate?: boolean }) => {
	//__Variables
	const { attrs } = data || {};

	if (!data) return null;
	return <CoreWrapper animate_type={animate ? 'fadeup' : undefined} attrs={attrs} element='div' element_class='wp_spacer' page_type={page_type} />;
};

export default CoreSpacer;

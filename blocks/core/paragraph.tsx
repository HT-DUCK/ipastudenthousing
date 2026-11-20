import parse from 'html-react-parser';
import CoreWrapper from './wrapper';
import { CoreBlockType } from 'lib/types';

const CoreParagraph = ({ data, page_type, animate = true }: { data: CoreBlockType; page_type?: string; animate?: boolean }) => {
	//__Variables
	const { attrs, innerHTML } = data || {};

	if (!data) return null;
	return (
		<CoreWrapper animate_type={animate ? 'fadeup' : undefined} attrs={attrs} element='p' element_class='wp_paragraph' page_type={page_type}>
			{innerHTML
				? parse(
						innerHTML
							.replace('<p>', '')
							.replace('</p>', '')
							.replace(/<p (.*?)">/g, '')
					)
				: null}
		</CoreWrapper>
	);
};

export default CoreParagraph;

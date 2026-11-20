import parse from 'html-react-parser';
import CoreWrapper from './wrapper';
import { CoreBlockType } from 'lib/types';

const CoreHeading = ({ data, page_type, animate = true }: { data: CoreBlockType; page_type?: string; animate?: boolean }) => {
	//__Variables
	const { attrs, innerHTML } = data || {};
	const { level } = attrs || {};

	if (!data) return null;
	return (
		<CoreWrapper animate_type={animate ? 'fadeup' : undefined} attrs={attrs} element={level ? `h${level}` : 'div'} element_class='wp_heading' page_type={page_type}>
			{innerHTML
				? level
					? parse(
							innerHTML
								.replace(`<h${level}>`, '')
								.replace(/<h[1-6] (.*?)">/g, '')
								.replace(`</h${level}>`, '')
						)
					: parse(innerHTML)
				: null}
		</CoreWrapper>
	);
};

export default CoreHeading;

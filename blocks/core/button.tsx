import parse from 'html-react-parser';
import CoreWrapper from './wrapper';
import { CoreBlockType } from 'lib/types';

const CoreButton = ({ data }: { data: CoreBlockType }) => {
	//__Variables
	const { attrs, innerHTML } = data || {};

	const url_pos = innerHTML?.indexOf('href="') ? innerHTML?.indexOf('href="') + 6 : 0;
	const url = innerHTML?.substring(url_pos, innerHTML.indexOf('"', url_pos));

	const target_pos = innerHTML?.indexOf('target="') ? innerHTML?.indexOf('target="') + 8 : 0;
	const target = innerHTML?.substring(target_pos, innerHTML.indexOf('"', target_pos));

	const rel_pos = innerHTML?.indexOf('target="') ? innerHTML?.indexOf('rel="') + 5 : 0;
	const rel = innerHTML?.substring(rel_pos, innerHTML.indexOf('"', rel_pos));

	if (!data || !innerHTML || !url) return null;
	return (
		<CoreWrapper attrs={attrs} element='link' element_class='wp_button' link={{ rel, title: '', target, url }}>
			{innerHTML
				? parse(
						innerHTML
							.replace('<div>', '')
							.replace('</div>', '')
							.replace(/<div (.*?)">/g, '')
							.replace('<a>', '')
							.replace('</a>', '')
							.replace(/<a (.*?)">/g, '')
					)
				: ''}
		</CoreWrapper>
	);
};

export default CoreButton;

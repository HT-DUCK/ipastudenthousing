import parse from 'html-react-parser';
import { CoreBlockType } from 'lib/types';

const CoreHTML = ({ data }: { data: CoreBlockType }) => {
	//__Variables
	const { innerHTML } = data || {};

	if (!data || !innerHTML) return null;
	return parse(innerHTML);
};

export default CoreHTML;

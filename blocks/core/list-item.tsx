import parse from 'html-react-parser';
import { CoreBlockType } from 'lib/types';

const CoreListItem = ({ data }: { data: CoreBlockType }) => {
	//__Variables
	const { innerHTML } = data || {};

	if (!data || !innerHTML) return null;
	return parse(innerHTML);
};

export default CoreListItem;

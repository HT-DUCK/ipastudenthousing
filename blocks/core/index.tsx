import CoreButton from './button';
import CoreButtons from './buttons';
import CoreColumn from './column';
import CoreColumns from './columns';
import CoreEmbed from './embed';
import CoreFreeform from './freeform';
import CoreGroup from './group';
import CoreHeading from './heading';
import CoreHTML from './html';
import CoreImage from './image';
import CoreList from './list';
import CoreListItem from './list-item';
import CoreParagraph from './paragraph';
import CoreSeparator from './separator';
import CoreSpacer from './spacer';

const CoreBlock = ({ block, page_type, animate = true }: { block: any; page_type?: string; animate?: boolean }) => {
	if (!block) return null;

	switch (block.blockName) {
		case 'core/button':
			return <CoreButton data={block} />;
		case 'core/buttons':
			return <CoreButtons data={block} page_type={page_type} animate={animate} />;
		case 'core/column':
			return <CoreColumn data={block} page_type={page_type} animate={animate} />;
		case 'core/columns':
			return <CoreColumns data={block} page_type={page_type} animate={animate} />;
		case 'core/embed':
			return <CoreEmbed data={block} page_type={page_type} animate={animate} />;
		case 'core/freeform':
			return <CoreFreeform data={block} page_type={page_type} animate={animate} />;
		case 'core/group':
			return <CoreGroup data={block} page_type={page_type} animate={animate} />;
		case 'core/heading':
			return <CoreHeading data={block} page_type={page_type} animate={animate} />;
		case 'core/html':
			return <CoreHTML data={block} />;
		case 'core/image':
			return <CoreImage data={block} page_type={page_type} animate={animate} />;
		case 'core/list':
			return <CoreList data={block} page_type={page_type} animate={animate} />;
		case 'core/list-item':
			return <CoreListItem data={block} />;
		case 'core/paragraph':
			return <CoreParagraph data={block} page_type={page_type} animate={animate} />;
		case 'core/separator':
			return <CoreSeparator data={block} page_type={page_type} animate={animate} />;
		case 'core/spacer':
			return <CoreSpacer data={block} page_type={page_type} animate={animate} />;
		default:
			return false;
	}
};

export default CoreBlock;

export { CoreButton, CoreButtons, CoreColumn, CoreColumns, CoreEmbed, CoreFreeform, CoreGroup, CoreHeading, CoreHTML, CoreImage, CoreList, CoreListItem, CoreParagraph, CoreSeparator, CoreSpacer };

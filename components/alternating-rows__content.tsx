import type { AlternatingRowsType } from 'lib/types';
import { AnimateWrapper } from 'wrappers';

import { Button } from 'elements';
import { ArrowButtonIcon } from 'components/svg';

const AlternatingRowsContent = ({ item, isReversed }: { item: AlternatingRowsType; isReversed?: boolean }) => {
	const { content } = item || {};
	const { content: item_content, cta, cta_style, heading, heading_tag, subheading, subheading_additional, subheading_bg_color, subheading_color } = content || {};

	return (
		<div className={`flex flex-col gap-6 justify-center md:max-w-[640px] w-full ${isReversed ? 'mr-auto' : 'ml-auto'} ${!subheading_additional ? 'md:gap-8' : ''}`}>
			{subheading_additional ? (
				<AnimateWrapper animate_type='fadeup' className='text-[12px]' element='div' threshold={0}>
					<span dangerouslySetInnerHTML={{ __html: subheading_additional }} />
				</AnimateWrapper>
			) : null}
			{subheading ? (
				<AnimateWrapper animate_type='fadeup' className={`flex items-center rounded-full self-start text-base min-h-7 px-4 ${!subheading_bg_color ? 'border-solid border-1' : ''}`} element='div' threshold={0} style={{ backgroundColor: subheading_bg_color ? subheading_bg_color : '', color: subheading_color ? subheading_color : '' }}>
					<span dangerouslySetInnerHTML={{ __html: subheading }} />
				</AnimateWrapper>
			) : null}
			{heading ? (
				<AnimateWrapper animate_type='fadeup' element={heading_tag} threshold={0}>
					<span dangerouslySetInnerHTML={{ __html: heading }} />
				</AnimateWrapper>
			) : null}
			{item_content ? (
				<AnimateWrapper animate_type='fadeup' element='div' threshold={0}>
					<div className='text-base' dangerouslySetInnerHTML={{ __html: item_content }} />
				</AnimateWrapper>
			) : null}
			{cta?.url ? (
				<AnimateWrapper animate_type='fadeup' className='self-start' element='div' threshold={0}>
					<Button className={`${cta_style === 'dark-link' ? 'arrow_link' : `btn ${cta_style}`} md:mt-2`} link={cta}>
						<ArrowButtonIcon width={24} />
					</Button>
				</AnimateWrapper>
			) : null}
		</div>
	);
};

export default AlternatingRowsContent;

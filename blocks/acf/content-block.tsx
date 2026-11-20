import { AnimateWrapper } from 'wrappers';

const ContentBlock = ({ data }: { data: any }) => {
	//__Variables
	const { content_wysiwyg } = data || {};

	if (!data) return null;

	return (
		<AnimateWrapper animate_type='fadeup' element='div' threshold={0}>
			{content_wysiwyg ? <div className='text-content flex flex-col gap-6 md:gap-10 text-base-gunmetal' dangerouslySetInnerHTML={{ __html: content_wysiwyg }} /> : null}
		</AnimateWrapper>
	);
};

export default ContentBlock;

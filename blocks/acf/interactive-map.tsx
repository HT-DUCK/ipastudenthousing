import { AnimateWrapper } from 'wrappers';

type DataType = {
	content?: string;
	custom_class?: string;
	heading?: string;
	map: string;
	sec_anchor_name?: string;
};

const InteractiveMap = ({ data }: { data: DataType }) => {
	//__Variables
	const { content, custom_class, heading, map, sec_anchor_name } = data || {};

	if (!data) return null;
	return (
		<section className={`my-16 relative md:gutter-x md:my-28${custom_class ? ` ${custom_class}` : ''}`} id={sec_anchor_name}>
			<div className='inner'>
				{heading ? (
					<AnimateWrapper animate_type='fadeup' element='h2' className='mb-2 text-center md:mb-7' threshold={0}>
						<span dangerouslySetInnerHTML={{ __html: heading }} />
					</AnimateWrapper>
				) : null}
				{content ? (
					<AnimateWrapper animate_type='fadeup' element='div' className='mb-11 text-center text-[17px] md:mb-14 md:text-xl' threshold={0}>
						<span dangerouslySetInnerHTML={{ __html: content }} />
					</AnimateWrapper>
				) : null}
				{map ? (
					<div>
						<iframe src={map} title='interactive_map' className='h-[720px] w-full' />
					</div>
				) : null}
			</div>
		</section>
	);
};

export default InteractiveMap;

import { LinkType } from 'lib/types';
import { Button } from 'elements';
import { ArrowButtonIcon } from 'components/svg';

import AnimatedBackBlock from 'components/animate-back-block';

type DataType = {
	sec_anchor_name?: string;
	title: string;
	button_link: LinkType;
};

const RecentCaseStudies = ({ data }: { data: DataType }) => {
	//__Variables
	const { title, sec_anchor_name, button_link } = data || {};

	if (!data) return null;

	return (
		<section className='relative z-2' id={sec_anchor_name}>
			<div className='md:min-h-[100dvh] flex py-10 relative'>
				<AnimatedBackBlock />
				<div className='wrapper my-auto relative z-2'>
					<div className='flex flex-col items-center gap-6 md:gap-8 text-center'>
						<h2 className='h1 text-base-gunmetal' dangerouslySetInnerHTML={{ __html: title }} />
						<Button link={button_link} className='btn btn-blue'>
							<ArrowButtonIcon width={24} />
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default RecentCaseStudies;

import { Suspense } from 'react';
import EventsResults from './results';
import { LoadingSVG } from 'elements/assets';

type DataType = {
	custom_class?: string;
	posts_per_page: string;
	sec_anchor_name?: string;
};

const Events = async ({ data }: { data: DataType }) => {
	//__Variables
	const { custom_class, sec_anchor_name, posts_per_page } = data || {};

	if (!data) return null;
	return (
		<section className={`gutter-x my-14 lg:my-28${custom_class ? ` ${custom_class}` : ''}`} id={sec_anchor_name}>
			<div className='inner'>
				<Suspense fallback={<LoadingSVG width={80} />}>
					<EventsResults posts_per_page={posts_per_page} />
				</Suspense>
			</div>
		</section>
	);
};

export default Events;

import { Suspense } from 'react';
import NewsFilters from './filters';
import NewsResults from './results';
import NewsSearch from './search';
import { LoadingSVG } from 'elements/assets';
import { TaxonomyTermType } from 'lib/types';

type DataType = {
	categories?: TaxonomyTermType[];
	custom_class?: string;
	posts_per_page: string;
	sec_anchor_name?: string;
};

const News = async ({ data }: { data: DataType }) => {
	//__Variables
	// const { categories, custom_class, sec_anchor_name, posts_per_page } = data || {};
	const { categories, posts_per_page } = data || {};

	if (!data) return null;
	return (
		<section className='py-10 md:pb-28 bg-white '>
			<div className='wrapper max-w-[1160px]'>
				<div className='flex flex-col gap-10'>
					<div className='flex justify-between max-md:gap-2 max-md:flex-col '>
						<Suspense fallback={<LoadingSVG width={80} />}>
							<NewsFilters categories={categories} />
						</Suspense>
						<Suspense fallback={<LoadingSVG width={80} />}>
							<NewsSearch />
						</Suspense>
					</div>

					<Suspense fallback={<LoadingSVG width={80} />}>
						<NewsResults posts_per_page={posts_per_page} />
					</Suspense>
				</div>
			</div>
		</section>
	);
};

export default News;

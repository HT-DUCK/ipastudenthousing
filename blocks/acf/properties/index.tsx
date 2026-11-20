import { Suspense } from 'react';
import { getTaxonomy } from 'lib/data';
import PropertiesFilters from './filters';
import ResourcesResults from './results';
import PropertiesSearch from './search';
import { LoadingSVG } from 'elements/assets';

type DataType = {
	category?: number;
	content?: string;
	heading?: string;
	subheading?: string;
};

const Properties = async ({ data }: { data: DataType }) => {
	//Data
	const categories = await getTaxonomy({ tax_slug: 'property_category' });

	//__Variables
	const { category } = data || {};

	if (!data) return null;
	return (
		<section className='py-10 md:pb-28 bg-white '>
			<div className='wrapper'>
				<div className='flex flex-col gap-10'>
					<div className='flex justify-between max-md:gap-2 max-md:flex-col '>
						<Suspense fallback={<LoadingSVG width={80} />}>
							<PropertiesFilters categories={categories} />
						</Suspense>
						<Suspense fallback={<LoadingSVG width={80} />}>
							<PropertiesSearch />
						</Suspense>
					</div>

					<Suspense fallback={<LoadingSVG width={80} />}>
						<ResourcesResults default_category={category} />
					</Suspense>
				</div>
			</div>
		</section>
	);
};

export default Properties;

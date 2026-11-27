import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import dateFormat from 'dateformat';
import { Metadata } from 'next';
import { getMetaData, getPageBySlug, getPages } from 'lib/data';
import Hero from 'blocks/acf/hero';
import Blocks from 'blocks';
import { PageType } from 'lib/types';
import Link from 'next/link';
import { AnimateWrapper } from 'wrappers';

import { ArrowIcon, CalendarIcon, ClockIcon } from 'components/svg';

const EventsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const { isEnabled } = await draftMode();
	const slug = (await params).slug;
	const page = await getPageBySlug({ slug, type: 'event', preview: isEnabled });
	if (!page?.id) {
		notFound();
	}

	//__Variables
	const { acf, blocks, category_obj, id, yoast_json } = page || {};
	const { end_date, event_time, start_date } = acf || {};

	const hero = blocks?.find((e: any) => e.blockName === 'acf/hero');

	return (
		<>
			{hero ? <Hero data={hero.attrs.data} /> : null}
			<div className={`wrapper wrapper-sm pt-10 md:pt-28 flex flex-col gap-6 items-start md:gap-10 ${category_obj?.length ? 'mb-3 md:mb-4' : 'mb-6 md:mb-10'}`}>
				<AnimateWrapper animate_type='fadeup' element='div' threshold={0}>
					<Link href='/events' className='flex items-center gap-2 text-base text-base-black-50 hover:text-base-gunmetal transition-ease'>
						<ArrowIcon className='rotate-90' width={20} />
						Back to Events
					</Link>
				</AnimateWrapper>
				<div className='flex flex-wrap gap-x-6 gap-y-2 text-base text-black/70'>
					{start_date ? (
						<div className='flex gap-2 items-start shrink-0'>
							<CalendarIcon width={24} />
							{dateFormat(start_date.replace(/-/g, '/'), 'mmm d, yyyy')}
							{end_date && end_date !== start_date ? ` - ${dateFormat(end_date.replace(/-/g, '/'), 'mmm d, yyyy')}` : ''}
						</div>
					) : null}
					{event_time ? (
						<div className='flex gap-2 items-start'>
							<ClockIcon width={22} />
							{event_time}
						</div>
					) : null}
				</div>
			</div>
			{blocks?.length ? <Blocks key={id} blocks={blocks} /> : null}
			{yoast_json?.schema ? <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(yoast_json.schema) }} /> : ''}
		</>
	);
};

export default EventsPage;

//Generate page params
export async function generateStaticParams() {
	const pages = await getPages({ type: 'event' });
	return pages.map((page: PageType) => ({
		slug: page.slug
	}));
}

//Get Meta Data
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const slug = (await params).slug;

	const page = await getPageBySlug({ slug, type: 'event' });

	if (!page?.yoast_json) return {};
	return getMetaData(page.yoast_json);
}

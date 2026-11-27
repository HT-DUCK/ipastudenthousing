import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import { Metadata } from 'next';
import { getMetaData, getPageBySlug, getPages } from 'lib/data';
import Blocks from 'blocks';
import { PageType, TaxonomyTermType } from 'lib/types';
import Link from 'next/link';
import { AnimateWrapper } from 'wrappers';
import Hero from 'blocks/acf/hero';

import { ArrowIcon } from 'components/svg';

const NewsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const { isEnabled } = await draftMode();
	const slug = (await params).slug;
	const page = await getPageBySlug({ slug, type: 'post', preview: isEnabled });
	if (!page?.id) {
		notFound();
	}

	//__Variables
	const { blocks, category_obj, id, yoast_json } = page || {};

	const hero = blocks?.find((e: any) => e.blockName === 'acf/hero');

	return (
		<>
			{hero ? <Hero data={hero.attrs.data} /> : null}
			<div className={`wrapper wrapper-sm pt-10 md:pt-28 flex flex-col gap-6 items-start md:gap-10 ${category_obj?.length ? 'mb-3 md:mb-4' : 'mb-6 md:mb-10'}`}>
				<AnimateWrapper animate_type='fadeup' element='div' threshold={0}>
					<Link href='/news' className='flex items-center gap-2 text-base text-base-black-50 hover:text-base-gunmetal transition-ease'>
						<ArrowIcon className='rotate-90' width={20} />
						Back to News
					</Link>
				</AnimateWrapper>
				{category_obj?.length ? (
					<AnimateWrapper animate_type='fadeup' className='flex gap-2' element='div' threshold={0}>
						{category_obj.map((item: TaxonomyTermType) => (
							<div key={`category_${item.term_id}`} className='bg-base-bronze inline-flex px-4 py-1.5 rounded-full text-xs' dangerouslySetInnerHTML={{ __html: item.name }} />
						))}
					</AnimateWrapper>
				) : null}
			</div>
			{blocks?.length ? <Blocks key={id} blocks={blocks} /> : null}
			{yoast_json?.schema ? <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(yoast_json.schema) }} /> : ''}
		</>
	);
};

export default NewsPage;

//Generate page params
export async function generateStaticParams() {
	const pages = await getPages({ type: 'post' });
	return pages.map((page: PageType) => ({
		slug: page.slug
	}));
}

//Get Meta Data
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const slug = (await params).slug;

	const page = await getPageBySlug({ slug, type: 'post' });

	if (!page?.yoast_json) return {};
	return getMetaData(page.yoast_json);
}

import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import { Metadata } from 'next';
import { getMetaData, getPageBySlug, getPages } from 'lib/data';
import Blocks from 'blocks';
import { PageType } from 'lib/types';
import Link from 'next/link';
import { AnimateWrapper } from 'wrappers';
import Hero from 'blocks/acf/hero';

import { ArrowIcon } from 'components/svg';

const Expertise = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const { isEnabled } = await draftMode();
	const slug = (await params).slug;
	const page = await getPageBySlug({ slug, type: 'expertise', preview: isEnabled });
	if (!page?.id) {
		notFound();
	}

	//__Variables
	const { blocks, id, yoast_json } = page || {};

	const hero = blocks?.find((e: any) => e.blockName === 'acf/hero');

	return (
		<>
			{hero ? <Hero data={hero.attrs.data} /> : null}
			<div className='wrapper wrapper-sm pt-10 md:pt-28 mb-6 md:mb-10'>
				<AnimateWrapper animate_type='fadeup' element='div' threshold={0}>
					<Link href='/expertise' className='flex items-center gap-2 text-base text-base-black-50 hover:text-base-gunmetal transition-ease'>
						<ArrowIcon className='rotate-90' width={20} />
						Back to Expertise
					</Link>
				</AnimateWrapper>
			</div>
			{blocks?.length ? <Blocks key={id} blocks={blocks} /> : null}
			{yoast_json?.schema ? <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(yoast_json.schema) }} /> : ''}
		</>
	);
};

export default Expertise;

//Generate page params
export async function generateStaticParams() {
	const pages = await getPages({ type: 'expertise' });
	return pages.map((page: PageType) => ({
		slug: page.slug
	}));
}

//Get Meta Data
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const slug = (await params).slug;

	const page = await getPageBySlug({ slug, type: 'expertise' });

	if (!page?.yoast_json) return {};
	return getMetaData(page.yoast_json);
}

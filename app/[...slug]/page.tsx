import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import { Metadata } from 'next';
import Blocks from 'blocks';
import { getPages, getMetaData, getPageByPath } from 'lib/data';
import { PageType } from 'lib/types';

const Page = async ({ params }: { params: Promise<{ slug: string[] }> }) => {
	const { isEnabled } = await draftMode();
	const slug = (await params).slug;
	const page = await getPageByPath({ path: `/${slug.join('/')}`, type: 'page', preview: isEnabled });
	if (!page?.id) {
		notFound();
	}

	//__Variables
	const { blocks, id, yoast_json } = page || {};

	return (
		<>
			{blocks && blocks.length ? <Blocks key={id} blocks={blocks} /> : null}
			{yoast_json?.schema ? <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(yoast_json.schema) }} /> : null}
		</>
	);
};

export default Page;

//Generate page params
export async function generateStaticParams() {
	const pages = await getPages({ type: 'page' });

	//Opt custom pages out of dynamic params
	const custom_slugs = ['home'];
	const clean_pages = pages.filter((e: PageType) => !custom_slugs.includes(e.slug));

	return clean_pages.map((page: PageType) => ({
		slug: page.relative_path?.split('/').slice(1) || []
	}));
}

//Get Meta Data
export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
	const slug = (await params).slug;

	const page = await getPageByPath({ path: `/${slug.join('/')}`, type: 'page' });

	if (!page?.yoast_json) return {};
	return getMetaData(page.yoast_json);
}

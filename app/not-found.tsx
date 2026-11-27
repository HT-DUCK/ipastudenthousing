import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPageById, getMetaData } from 'lib/data';
import Blocks from 'blocks';

const NotFound = async () => {
	const page = await getPageById({ id: 11 });
	if (!page) {
		notFound();
	}

	//__Variables
	const { blocks, id, yoast_json } = page || {};

	return (
		<>
			<div className='pt-32 hidden' />
			{blocks?.length ? <Blocks key={id} blocks={blocks} /> : null}

			{yoast_json?.schema ? <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(yoast_json.schema) }} /> : null}
		</>
	);
};
export default NotFound;

//Get Meta Data
export async function generateMetadata(): Promise<Metadata> {
	const page = await getPageById({ id: 11 });

	if (!page?.yoast_json) return {};
	return getMetaData(page.yoast_json);
}

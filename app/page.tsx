import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import { Metadata } from 'next';
import { getPageById, getMetaData } from 'lib/data';
import Blocks from 'blocks';

const Home = async () => {
	//__Data
	const { isEnabled } = await draftMode();
	const page = await getPageById({ id: 2, preview: isEnabled });
	if (!page?.id) {
		notFound();
	}

	//__Variables
	const { blocks, id, yoast_json } = page || {};

	return (
		<>
			{blocks?.length ? <Blocks key={id} blocks={blocks} /> : null}
			{yoast_json?.schema ? <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(yoast_json.schema) }} /> : null}
		</>
	);
};
export default Home;

//Get Meta Data
export async function generateMetadata(): Promise<Metadata> {
	const page = await getPageById({ id: 2 });

	if (!page?.yoast_json) return {};
	return getMetaData(page.yoast_json);
}

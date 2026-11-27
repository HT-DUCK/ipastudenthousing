import { getSitemapXML } from 'lib/data';
import { PageType } from 'lib/types';

const SitemapXML = async () => {
	const pages = await getSitemapXML({ type: 'post' });

	//Removing 404 page
	const clean_pages = pages.filter((e: PageType) => e.id !== 11);

	return clean_pages.map((page: PageType) => ({
		url: page.link,
		lastModified: page.post_modified?.split(' ')[0] || '',
		changeFrequency: 'weekly',
		priority: 1.0
	}));
};
export default SitemapXML;

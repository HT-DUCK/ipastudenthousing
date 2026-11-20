const base64 = require('base-64');
import { decode } from 'html-entities';
import type { Metadata } from 'next';
import type { YoastType } from 'lib/types';

export async function getGravityForms(id?: number) {
	const res = await fetch(`${process.env.WORDPRESS_URL}/wp-json/overlap/gforms/${id}`, {
		headers: { Authorization: `Basic ${base64.encode(`${process.env.REST_APP_USERNAME}:${process.env.REST_APP_PASSWORD}`)}` },
		next: { revalidate: process.env.REVALIDATE_TIME ? parseInt(process.env.REVALIDATE_TIME, 10) : 604800, tags: ['forms'] }
	});
	// The return value is *not* serialized
	// You can return Date, Map, Set, etc.

	if (!res.ok) {
		console.log(res);
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to fetch data');
	}

	return res.json();
}

export async function getMenus({ slug, id, revalidate_time }: { slug?: string; id?: number; revalidate_time?: number }) {
	const res = await fetch(`${process.env.WORDPRESS_URL}/wp-json/overlap/menus?slug=${slug}&id=${id}`, {
		headers: { Authorization: `Basic ${base64.encode(`${process.env.REST_APP_USERNAME}:${process.env.REST_APP_PASSWORD}`)}` },
		next: { revalidate: revalidate_time ? revalidate_time : process.env.REVALIDATE_TIME ? parseInt(process.env.REVALIDATE_TIME, 10) : 604800, tags: ['menus'] }
	});
	// The return value is *not* serialized

	if (!res.ok) {
		console.log(res);
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to fetch data');
	}

	return res.json();
}

export async function getThemeOptions() {
	const res = await fetch(`${process.env.WORDPRESS_URL}/wp-json/overlap/options/`, {
		headers: { Authorization: `Basic ${base64.encode(`${process.env.REST_APP_USERNAME}:${process.env.REST_APP_PASSWORD}`)}` },
		next: { revalidate: process.env.REVALIDATE_TIME ? parseInt(process.env.REVALIDATE_TIME, 10) : 604800, tags: ['options'] }
	});
	// The return value is *not* serialized
	// You can return Date, Map, Set, etc.

	if (!res.ok) {
		console.log(res);
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to fetch data');
	}

	return res.json();
}

export function getMetaData(yoast: YoastType) {
	const metadata: Metadata = {
		alternates: {
			canonical: yoast?.og_url || ''
		},
		description: decode(yoast?.description || '') || '',
		metadataBase: new URL(process.env.SITE_URL || ''),
		openGraph: {
			title: decode(yoast?.og_title),
			locale: yoast?.og_locale,
			type: yoast?.og_type || 'website',
			description: decode(yoast?.description),
			url: yoast?.og_url,
			siteName: decode(yoast?.og_site_name),
			modifiedTime: yoast?.article_modified_time,
			images: yoast?.og_image || undefined
		},
		robots: {
			index: yoast?.robots?.index === 'index',
			follow: yoast?.robots?.follow === 'follow',
			nocache: yoast?.robots?.nocache === 'nocache',
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1
		},
		title: decode(yoast?.title || '') || '',
		twitter: {
			card: yoast?.twitter_card
		}
	};
	return metadata;
}

export async function getPageById({ id, preview = false, bare, revalidate_time }: { id: number | string; preview?: boolean; bare?: boolean; revalidate_time?: number }) {
	if (id) {
		const res = await fetch(`${process.env.WORDPRESS_URL}/wp-json/overlap/posts/${id}?preview=${preview}${bare ? '&blocks=false&acf=false&children=false&parent=false&yoast=false' : ''}`, {
			headers: { Authorization: `Basic ${base64.encode(`${process.env.REST_APP_USERNAME}:${process.env.REST_APP_PASSWORD}`)}` },
			next: { revalidate: revalidate_time ? revalidate_time : process.env.REVALIDATE_TIME ? parseInt(process.env.REVALIDATE_TIME, 10) : 604800, tags: ['pages'] }
		});
		// The return value is *not* serialized
		// You can return Date, Map, Set, etc.

		if (!res.ok) {
			console.log(res);
			// This will activate the closest `error.js` Error Boundary
			throw new Error('Failed to fetch data');
		}

		return res.json();
	} else {
		return {};
	}
}

export async function getPageByPath({ path, type, preview = false, bare, revalidate_time }: { path: string; type?: string; preview?: boolean; bare?: boolean; revalidate_time?: number }) {
	if (path) {
		const res = await fetch(`${process.env.WORDPRESS_URL}/wp-json/overlap/posts?path=${path}&type=${type}&preview=${preview}${bare ? '&blocks=false&acf=false&children=false&parent=false&yoast=false' : ''}`, {
			headers: { Authorization: `Basic ${base64.encode(`${process.env.REST_APP_USERNAME}:${process.env.REST_APP_PASSWORD}`)}` },
			next: { revalidate: revalidate_time ? revalidate_time : process.env.REVALIDATE_TIME ? parseInt(process.env.REVALIDATE_TIME, 10) : 604800, tags: ['pages'] }
		});
		// The return value is *not* serialized
		// You can return Date, Map, Set, etc.

		if (!res.ok) {
			console.log(res);
			// This will activate the closest `error.js` Error Boundary
			throw new Error('Failed to fetch data');
		}

		return res.json();
	} else {
		return {};
	}
}

export async function getPageBySlug({ slug, type, preview = false, bare, revalidate_time }: { slug: string; type: string; preview?: boolean; bare?: boolean; revalidate_time?: number }) {
	if (slug && type) {
		const res = await fetch(`${process.env.WORDPRESS_URL}/wp-json/overlap/posts?type=${type}&slug=${slug}&preview=${preview}${bare ? '&blocks=false&acf=false&children=false&parent=false&yoast=false' : ''}`, {
			headers: { Authorization: `Basic ${base64.encode(`${process.env.REST_APP_USERNAME}:${process.env.REST_APP_PASSWORD}`)}` },
			next: { revalidate: revalidate_time ? revalidate_time : process.env.REVALIDATE_TIME ? parseInt(process.env.REVALIDATE_TIME, 10) : 604800, tags: ['pages'] }
		});
		// The return value is *not* serialized
		// You can return Date, Map, Set, etc.

		if (!res.ok) {
			console.log(res);
			// This will activate the closest `error.js` Error Boundary
			throw new Error('Failed to fetch data');
		}

		return res.json().then((result) => result[0]);
	} else {
		return {};
	}
}

export async function getPages({ type, preview = false, bare, revalidate_time }: { type: string; preview?: boolean; bare?: boolean; revalidate_time?: number }) {
	if (type) {
		const res = await fetch(`${process.env.WORDPRESS_URL}/wp-json/overlap/posts?type=${type}&preview=${preview}${bare ? '&blocks=false&acf=false&children=false&parent=false&yoast=false' : ''}`, {
			headers: { Authorization: `Basic ${base64.encode(`${process.env.REST_APP_USERNAME}:${process.env.REST_APP_PASSWORD}`)}` },
			next: { revalidate: revalidate_time ? revalidate_time : process.env.REVALIDATE_TIME ? parseInt(process.env.REVALIDATE_TIME, 10) : 604800, tags: ['pages'] }
		});
		// The return value is *not* serialized
		// You can return Date, Map, Set, etc.

		if (!res.ok) {
			console.log(res);
			// This will activate the closest `error.js` Error Boundary
			throw new Error('Failed to fetch data');
		}

		return res.json();
	} else {
		return [];
	}
}

export async function getTaxonomy({ term_id = '', tax_slug = '', term_slug = '', post_type = '', acf = false, yoast = false, description = false, preview = false, revalidate_time }: { term_id?: string; tax_slug?: string; term_slug?: string; post_type?: string; acf?: boolean; yoast?: boolean; description?: boolean; preview?: boolean; revalidate_time?: number }) {
	const res = await fetch(`${process.env.WORDPRESS_URL}/wp-json/overlap/taxonomy?term_id=${term_id}&tax_slug=${tax_slug}&term_slug=${term_slug}&post_type=${post_type}&acf=${acf}&yoast=${yoast}&description=${description}&preview=${preview}`, {
		headers: { Authorization: `Basic ${base64.encode(`${process.env.REST_APP_USERNAME}:${process.env.REST_APP_PASSWORD}`)}` },
		next: { revalidate: revalidate_time ? revalidate_time : process.env.REVALIDATE_TIME ? parseInt(process.env.REVALIDATE_TIME, 10) : 604800, tags: ['taxonomy'] }
	});
	// The return value is *not* serialized
	// You can return Date, Map, Set, etc.

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to fetch data');
	}

	return res.json();
}

export async function getSitemapXML({ type, yoast }: { type?: string; yoast?: boolean }) {
	const res = await fetch(`${process.env.WORDPRESS_URL}/wp-json/overlap/sitemap?type=${type || ''}&yoast=${yoast}`, {
		headers: { Authorization: `Basic ${base64.encode(`${process.env.REST_APP_USERNAME}:${process.env.REST_APP_PASSWORD}`)}` },
		next: { revalidate: process.env.REVALIDATE_TIME ? parseInt(process.env.REVALIDATE_TIME, 10) : 604800, tags: ['sitemap'] }
	});
	// The return value is *not* serialized
	// You can return Date, Map, Set, etc.

	if (!res.ok) {
		console.log(res);
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to fetch data');
	}

	return res.json();
}

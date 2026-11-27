import base64 from 'base-64';
import { NextRequest } from 'next/server';
import { objectToQueryString } from 'lib/functions';

export async function GET(request: NextRequest) {
	const { searchParams } = request.nextUrl || {};
	const query = searchParams.has('query') ? JSON.parse(searchParams.get('query') || '') : null;
	const query_string = query ? objectToQueryString(query) : '';

	const res = await fetch(`${process.env.WORDPRESS_URL}/wp-json/overlap/get-properties?${query_string}`, {
		headers: { Authorization: `Basic ${base64.encode(`${process.env.REST_APP_USERNAME}:${process.env.REST_APP_PASSWORD}`)}` },
		next: { revalidate: 43200, tags: ['properties'] }
	});

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to fetch data');
	}

	const data = await res.json();
	return Response.json(data);
}

// route handler enabling draft mode
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getPageByPath, getPageById } from 'lib/data';

export async function GET(request: Request) {
	const cookieStore = await cookies();
	const { searchParams } = new URL(request.url);
	const secret = searchParams.get('secret');
	const path = searchParams.get('path');
	const page_id = searchParams.get('page_id');
	const logged_in = cookieStore.get('overlap_loggedin');

	if (!logged_in) {
		return new Response('Invalid permissions. User not logged in.', { status: 403 });
	}

	if (secret !== process.env.PREVIEW_TOKEN || (!path && !page_id)) {
		return new Response('Invalid token', { status: 401 });
	}

	let page = null;
	if (page_id) {
		page = await getPageById({ id: page_id });
	} else if (path) {
		page = await getPageByPath({ path });
	}

	if (!page) {
		return new Response('Invalid path', { status: 401 });
	}

	const draft = await draftMode();
	draft.enable();
	redirect(page.relative_path);
}

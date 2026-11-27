import { revalidatePath, revalidateTag } from 'next/cache';
//import { redirect } from 'next/navigation';
import { draftMode } from 'next/headers';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const path = searchParams.get('path');
	const tag = searchParams.get('tag');
	const secret = searchParams.get('secret');
	const redirect_route = searchParams.get('redirect');

	if (secret !== process.env.REVALIDATE_TOKEN || (!path && !tag)) {
		return Response.json({
			revalidated: false,
			now: Date.now(),
			message: 'Invalid Token or Missing Path'
		});
	}

	try {
		if (path) {
			revalidatePath(path);
		} else if (tag) {
			revalidateTag(tag);
		} else {
			return Response.json({
				revalidated: false,
				now: Date.now(),
				message: `Error revalidating: missing path or tag`
			});
		}
	} catch (err) {
		// If there was an error, Next.js will continue
		// to show the last successfully generated page
		console.log(err);
		return Response.json({
			revalidated: false,
			now: Date.now(),
			message: `Error revalidating: ${err}`
		});
	}

	const draft = await draftMode();
	draft.disable();

	if (redirect_route && path) {
		return Response.redirect(`${process.env.SITE_URL}${path}`, 307);
	} else {
		return Response.json({ revalidated: true, now: Date.now() });
	}
}

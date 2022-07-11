import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async function ({ event, resolve }) {
	const {
		// request,
		url: { pathname }
	} = event;

	const response = await resolve(event, {
		// SSR enabled for every page except   /secret-menu
		ssr: !pathname.startsWith('/secret-menu')
	});

	return response;
};

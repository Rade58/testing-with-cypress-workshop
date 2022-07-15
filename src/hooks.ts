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

// I GUESS FOR INSERTING USER OBJECT INTO session WE WOULD NEED TO USE
// getSession HOOK
// LOOK INO THIS
// https://kit.svelte.dev/docs/hooks#getsession

// MAYBE CONSULT THIS TUTORIAL:
// https://www.youtube.com/watch?v=Bh8KScx8vV8

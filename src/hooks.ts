import type { Handle, GetSession } from '@sveltejs/kit';
import cookie from 'cookie';
import { decodeToken } from '$util/jwt';

export const handle: Handle = async function ({ event, resolve }) {
	const {
		request,
		locals,
		url: { pathname }
	} = event;

	// WE WANT HERE TO HANDLE JSON WEB TOKEN
	// WE WILL TAKE IT FROM COOKIE
	// DECODE IT AND CHECK IF IT'S VALID
	// IF NOT WE ARE GOING TO ASSIGN null TO A USER

	const cookieHeader = request.headers.get('cookie');

	const cookies = cookie.parse(cookieHeader || '');

	const jwt = cookies.jwt && decodeToken(cookies.jwt);

	// I HAVE YET TO FIND OUT WHAT IS locals
	// OBJECT (IS IT APPENDING EXTRA DATA ON REQUEST)
	// THAT IS MOST PLAUSIBLE
	locals.user = jwt ? JSON.parse(jwt) : null;

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

// I FIGURE IT OUT

export const getSession: GetSession = ({ locals }) => {
	return {
		user: locals.user && {
			id: +locals.user.id,
			email: locals.user.email
		}
	};
};

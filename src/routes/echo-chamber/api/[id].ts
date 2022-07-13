import type { RequestHandler, RequestEvent, RequestHandlerOutput, Server } from '@sveltejs/kit';

import prisma from '$lib/prisma';

// FOR DELETING A POST
export const del: RequestHandler = async ({ request, params }) => {
	const id = +params['id'];

	console.log('Delete');

	await prisma.post.delete({
		where: {
			id
		}
	});

	// FOR NEXT THINGS I PUT HERE IS NOT CLEAR TO ME
	// WHY ORIGINAL CREATOR DIDN'T ANTICIPATED "DELETE"
	// METHOD ABOVE, AND HE CHOOSE TO SOMEHOW MAKE
	// A REDIRECT HERE IN CASE OF "POST" METHOD

	if (request.method === 'post') {
		return {
			headers: {
				Location: '/echo-chamber/posts'
			},
			status: 303
		};
	}

	return {
		status: 200
	};
};

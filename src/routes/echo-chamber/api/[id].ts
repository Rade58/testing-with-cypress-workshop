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
	// EVEN WE ARE IN DELETE HANDLER

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

// FOR GETTING THE POST
// BUT BASED ON QUERYSTRING (WE WILL ANTICIPATE THAT TOO)
// THIS ROUTE CAN ALSO DELETE POST TOO
// WE WILL USE DELETE HANDLER AS MIDDLEWARE (YOU'LL SEE HOW)

export const get: RequestHandler = async (event) => {
	const {
		url: { searchParams },
		params
	} = event;

	if (searchParams.get('_method')?.toLowerCase() === 'delete') {
		return del(event);
	}

	const { id } = params;

	const post = await prisma.post.findUnique({
		where: {
			id: +id
		},
		include: {
			author: {
				select: {
					id: true,
					email: true
				}
			}
		}
	});

	if (post) {
		return {
			body: {
				post
			}
		};
	}

	return {
		status: 404
	};
};

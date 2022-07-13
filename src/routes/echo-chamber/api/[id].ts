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
			// THIS IS A See Other STATUS CODE
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

// FOR UPDATING A POST
export const patch: RequestHandler = async ({ request, params }) => {
	const { id } = params;

	const formDataBody = await request.formData();
	// eslint-disable-next-line
	// @ts-ignore
	const { content }: FormDataPostType = Object.fromEntries(formDataBody);

	const post = await prisma.post.update({
		where: {
			id: +id
		},
		data: {
			content
		}
	});

	// AGAIN I AM DOING SOMETHING WHAT ALSO ORIGINAL CREATOR OF WORKSH
	// DID, BUT I DON'T UNDERSTAND WHY (MAYBE I'LL FIND OUT IN FUTURE)

	// HEADERS ARE HANDLED HERE (WOULDN'T BE LOGIC
	// THAT WE HANDLED HEADERS BEFORE CREATING POST)

	if (request.headers.get('accept') !== 'application/json') {
		return {
			headers: {
				Location: `/echo-chamber/posts/${post.id}`
			},
			// THIS IS A See Other STATUS CODE
			status: 303
		};
	}

	// THIS IS NORMAL
	return {
		status: 200,
		body: post
	};
};

// FOR CREATING THE POST
// IN HERE WE ARE ANTICIPATING FORM DATA
// ALSO WE ARE HANDLING QUERYSTRING
// AND WE ARE PATCHING OR DELITING DEPENDING ON QUERYSTRING VALUE

export const post: RequestHandler = async (event) => {
	const {
		request,
		url: { searchParams }
	} = event;

	// I REALLY DON'T UNDERSTAN WHY AREN'T WE CREATING POST IN HERE
	// I CAN SEE THAT WE ARE ONLY
	// UPDTING OR DELETING (IN "MIDDLEWARE WAY") DEPENDING ON QUERYSTRING

	const _method = searchParams.get('_method')?.toLowerCase();

	if (_method === 'patch') return patch(event);
	if (_method === 'delete') return del(event);

	return {
		status: 404
	};
};

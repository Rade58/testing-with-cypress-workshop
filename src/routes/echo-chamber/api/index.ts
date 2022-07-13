// MAKES SENSE THAT WE ARE GOING TO PUT HERE AN
// API ROUTES THAT ARE CREATING SINGLE POST, AND GETTING
// ALL POSTS
import type { RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const get: RequestHandler = async (event) => {
	const posts = await prisma.post.findMany({
		include: {
			author: {
				select: {
					id: true,
					email: true
				}
			}
		}
	});

	if (posts) {
		return {
			body: {
				posts
			}
		};
	}

	return {
		status: 404
	};
};

// HERE WE ARE ANTICIPTING Content-Type: "application/json"

export const post: RequestHandler = async ({ request }) => {
	//  body IS READABLE STREAM WITH UINT8ARRAY

	const { body } = request;

	if (!body) {
		return {
			status: 400
		};
	}

	// let content: string;
	// let authorId: number;

	const reader = body.getReader();

	const readStreamResult = await reader.read();

	const uint8Arr = readStreamResult.value;

	if (!uint8Arr) {
		return {
			status: 400
		};
	}

	const decoder = new TextDecoder();

	const jsonStringData = decoder.decode(uint8Arr);

	const data: { content: string; authorId: number } = JSON.parse(jsonStringData);

	const post = await prisma.post.create({
		data
	});

	if (request.headers.get('accept') !== 'application/json') {
		return {
			headers: {
				Location: `/echo-chamber/posts/${post.id}`
			},
			status: 303
		};
	}

	//var uint8array = new TextEncoder().encode("¢");
	//var string = new TextDecoder().decode(uint8array);
	//
	return {
		status: 201,
		body: {
			post
		}
	};
};

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
	const { body } = request;

	if (!body) {
		return {
			status: 400
		};
	}

	// body SHOULD BE     ReadableStream<Uint8Array> | null
	// BUT WE ARE GOING TO HANDLE FEW MORE CASES
	// MAYBE SOMEONE SENDS DIFFERENT DATA TO THIS API ROUTE

	let content: string;
	let authorId: number;

	if (body instanceof ReadableStream<Uint8Array>) {
		const reader = body.getReader();

		const readStreamResult = await reader.read();

		const uint8Arr = readStreamResult.value;

		if (!uint8Arr) {
			return {
				status: 400
			};
		}

		// ASUMING THAT DATA SENT IN REQUEST IS STRINGIFIED JSON
		// I CAN DO LIKE THIS

		/* const decoder = new TextDecoder();

		const jsonStringData = decoder.decode(uint8Arr);

		const data: { content: string; authorId: number } = JSON.parse(jsonStringData);
 		*/
		// OR LIKE THIS
		const jsonData = Buffer.from(uint8Arr).toString('utf-8');

		console.log({ jsonData });

		const data: { content: string; authorId: number } = JSON.parse(jsonData);

		const post = await prisma.post.create({
			data: {
				content: data.content,
				author: {
					connect: {
						id: +data.authorId
					}
				}
			}
		});

		// console.log(request.headers.get('accept'));

		if (request.headers.get('accept') !== 'application/json') {
			console.log({ POST_ID: post.id });

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

		console.log({ post });

		return {
			status: 201,
			body: {
				post
			},
			headers: {
				'Content-Type': 'application/json'
			}
		};
	}

	// NOW TO DO THINGS SIMILAR LIKE AUTHOR OF WORKSHOP DID IT
	// MAYBE HE DID THIS BECAUSE HE USED OLDER SVELTEKIT PACKAGE
	// AND THAT TIME, MAYBE AT THAT TIME API WAS DIFFERENT
	// BUT NEVER MIND, I'LL WRITE THIS OUT HERE TOO
	if (typeof body === 'string') {
		content = JSON.parse(body).content;
		authorId = JSON.parse(body).authorId;
	} else {
		// eslint-disable-next-line
		// @ts-ignore
		content = body.get('content');
		// eslint-disable-next-line
		// @ts-ignore
		authorId = +body.get('authorId');
	}

	const post = await prisma.post.create({
		data: {
			content,
			authorId
		}
	});

	if (!post) {
		return {
			status: 400
		};
	}

	return {
		status: 201,
		body: {
			post
		}
	};
};

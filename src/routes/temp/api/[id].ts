// JUST FOR TRYOUT PURPOSES

import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async ({ request: req, params }) => {
	const { id } = params;

	const body = req.body;

	if (!body) return { status: 400 };

	const reader = body.getReader();

	const readStreamResult = await reader.read();

	const uint8Arr = readStreamResult.value;

	if (!uint8Arr) return { status: 400 };

	const decoder = new TextDecoder();

	const jsonStringData = decoder.decode(uint8Arr);

	const dataOne: { content: string; authorId: number } = JSON.parse(jsonStringData);

	// OR LIKE THIS
	const jsonData = Buffer.from(uint8Arr).toString('utf-8');

	const dataTwo: { content: string; authorId: number } = JSON.parse(jsonData);

	return {
		status: 201,
		body: {
			dataOne,
			dataTwo,
			id
		},
		headers: {
			'Content-Type': 'application/json'
		}
	};
};

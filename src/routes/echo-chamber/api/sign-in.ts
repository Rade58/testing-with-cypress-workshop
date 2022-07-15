import type { RequestHandler } from '@sveltejs/kit';
// import type { User } from '@prisma/client';
import prisma from '$lib/prisma';
import { respond } from './_respond';

export const post: RequestHandler = async (event) => {
	// MAIN IDEA IS IS USER IS REALLY SIGNED IN

	const { body } = event.request;

	let email: string;
	let password: string;

	if (!body) {
		return {
			status: 401
		};
	}

	if (body instanceof ReadableStream<Uint8Array>) {
		const reader = body.getReader();

		const uint8Arr = (await reader.read()).value;

		if (!uint8Arr) {
			return {
				headers: {
					Location: '/echo-chamber/sign-in?error=Something+wrong+with+the+body.'
				},
				status: 303
			};
		}

		const data: { email: string; password: string } = JSON.parse(
			Buffer.from(uint8Arr).toString('utf-8')
		);

		email = data.email;
		password = data.password;
	} else if (typeof body === 'string') {
		const parsedBody: { email: string; password: string } = JSON.parse(body);

		email = parsedBody.email;
		password = parsedBody.password;
	} else {
		// eslint-disable-next-line
		// @ts-ignore
		email = body.get('email');
		// eslint-disable-next-line
		// @ts-ignore
		password = body.get('password');
	}

	const user = await prisma.user.findUnique({
		where: {
			email
		}
	});

	if (!user) {
		return {
			headers: {
				Location: '/echo-chamber/sign-in?error=No+such+user+exists.'
			},
			status: 303
		};
	}

	if (user.password !== password) {
		return {
			headers: {
				Location: `/echo-chamber/sign-in?error=Incorrect+password`
			},
			status: 303
		};
	}

	return respond({ user });
};

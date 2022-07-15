import type { RequestHandler } from '@sveltejs/kit';
import type { User } from '@prisma/client';
import prisma from '$lib/prisma';

export const post: RequestHandler = async (event) => {
	const { body } = event.request;

	let user: User | null;
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
				status: 401
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

	try {
		user = await prisma.user.create({
			data: {
				email,
				password
			}
		});
	} catch (err) {
		return {
			headers: {
				Location: `/echo-chamber/sign-up?error=A+user+already+exists+with+that+email.`
			},
			status: 303
		};
	}

	if (!user) {
		return {
			headers: {
				Location: `/echo-chamber/sign-up?error=No+such+user+exists.`
			},
			status: 303
		};
	}

	return {
		status: 302,
		headers: {
			Location: `/echo-chamber`
		},
		body: {
			user: {
				id: user.id,
				email: user.email
			}
		}
	};
};
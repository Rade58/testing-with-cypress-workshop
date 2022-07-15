import type { RequestHandler } from '@sveltejs/kit';
import type { User } from '@prisma/client';
import prisma from '$lib/prisma';

// THERE IS A PROBLEM
// THE AUTHOR OF THE COURSE DIDN'T WANT TO
// SEND REQUESTS TO THIS ROUTE WITH USAGE OF HANDLERS
// SO I HAVE PROBLEM OF SETTING HEADERS
// SO I DECIED TO READ BODY FROM REQUEST AND
// THEN TO PARSE STRING WE ARE GETTING
// AND THAT STRING ISN'T IN   JSON   FORMAT

export const post: RequestHandler = async (event) => {
	// console.log('STUFFFF STUFFFF STUFFF');

	const { body } = event.request;

	// console.log({ body });

	let user: User | null;
	let email: string;
	let password: string;

	if (!body) {
		return {
			headers: {
				Location: `/echo-chamber/sign-up?error=Something+is+wrong+with+body.`
			},
			status: 303
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

		const buff = Buffer.from(uint8Arr);

		const stringData = buff.toString('utf-8');

		// I DID SOMETHING LIKE THIS TO PARSE OUT DATA

		// eslint-disable-next-line
		// @ts-ignore
		const data: { email: string; password: string } = Object.fromEntries(
			new URLSearchParams(stringData).entries()
		);

		// console.log({ object });
		// THIS WON'T WORK
		// const data: { email: string; password: string } = JSON.parse(stringData);

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

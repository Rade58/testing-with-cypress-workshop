import type { RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const get: RequestHandler = async (event) => {
	const users = await prisma.user.findMany({
		select: {
			id: true,
			email: true
		}
	});

	if (users) {
		return {
			body: {
				users
			}
		};
	}

	return {
		status: 404
	};
};

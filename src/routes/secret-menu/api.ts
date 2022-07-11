import type { RequestHandler } from '@sveltejs/kit';
import data from './secret-menu.json';

export const get: RequestHandler<any, SecretMenuItemAPIResponseType> = async () => {
	return {
		body: {
			data: data as SecretMenuItemAPIResponseType
		}
	};
};

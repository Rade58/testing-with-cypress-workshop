import type { RequestHandler } from '@sveltejs/kit';

import data from './dog-facts.json';

const shuffle = <T>(data: T[]): T[] => {
	return data.sort((a, b) => {
		// SORT a BEFORE b
		return -1;
	});
};

import type { RequestHandler } from '@sveltejs/kit';

import data from './dog-facts.json';

const shuffle = <T>(data: T[]): T[] => {
	return data.sort((a, b) => {
		if (Math.round(Math.random())) return 1;

		return -1;
	});
};

// -----------------------
export const get: RequestHandler<any, { facts: DogFact[]; amount: number }> = async (event) => {
	// WE WANT QUERY PARAMS
	const {
		url: { searchParams },
		params
	} = event;

	// THIS IS HOW I GET QUERYSTRING PARAMS
	const amount = searchParams.get('amount')?.toLowerCase();

	// USING THIS JUST TO SEE IF THIS IS WHAT I THINK IT IS

	const againAmount = params['amount']?.toLowerCase();

	// WE WILL TAKE ONLY AMOUNT OF FACTS THAT IS SPECIFIED
	// BY QUERY PARAMETER

	let facts: DogFact[];

	if (amount) {
		facts = shuffle<DogFact>(data).slice(0, +amount);
	} else {
		facts = [];
	}

	return {
		body: {
			facts,
			// THIS IS ONLY FOR PRACTICING
			// I'M JUST PASSING TO SEE IF againAmount IS SAME AS amount
			amount: +againAmount
		}
	};
};

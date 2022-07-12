// THISS ENDPOINT WILL SERVE ONE POKEMON BASED ON ID YOU PROVIDED AS
// PART OF THE ROUTE
import type { RequestHandler } from '@sveltejs/kit';
import data from '../pokemon.json';

export const get: RequestHandler = async ({ params }) => {
	const { id } = params;

	for (const pokemon of data) {
		if (pokemon.id === +id) {
			return {
				body: {
					pokemons: [pokemon]
				}
			};
		}
	}

	return {
		pokemons: []
	};
};

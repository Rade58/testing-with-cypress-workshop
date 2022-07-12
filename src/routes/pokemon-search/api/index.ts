import type { RequestHandler } from '@sveltejs/kit';
import data from '../pokemon.json';

// THIS HANDLER SHOULD SEND POKEMON
// BASED ON QUERY PARAMETER (SERCHING BY POKEMON name)

// array.prototype.filter IS USED HERE BECAUSE THERE IS A POSSABILITY
// THAT YOU FIND MULTIPLE ITEMS BASED ON QUERYSTRING

export const get: RequestHandler = async ({ url: { searchParams } }) => {
	const name = searchParams.get('name');

	if (!name) {
		return {
			body: {
				pokemons: []
			}
		};
	}

	if (data) {
		const pokemons = data.filter((poke) => {
			return poke.name?.toLowerCase()?.startsWith(name.toLowerCase());
		});

		return {
			body: {
				pokemons
			}
		};
	} else {
		return {
			body: {
				pokemons: []
			}
		};
	}

	return {
		body: {
			pokemons: []
		}
	};
};

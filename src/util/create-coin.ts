import { getId } from './id';

export const createCoin = (title: string, shitcoin = false): CoinType => {
	//
	return {
		id: getId(),
		title,
		shitcoin
	};
};

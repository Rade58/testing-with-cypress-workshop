import { writable, derived } from 'svelte/store';
import { createCoin } from '$util/create-coin';

const store = writable<CoinType[]>([
	createCoin('Shiba Inu'),
	createCoin('Dogecoin'),
	createCoin('Ethereum'),
	createCoin('Bitcoin'),
	createCoin('Hedera'),
	createCoin('Decentraland', true)
]);

const addCoin = (title: string) => store.update((old) => [...old, createCoin(title)]);

const removeCoin = (id: number) =>
	store.update((old) => {
		return old.filter((coin) => {
			if (coin.id !== id) return coin;
		});
	});

const toggle = (id: number) => {
	return store.update((old) => {
		return old.map((coin) => {
			if (coin.id === id) {
				return { ...coin, shitcoin: !coin.shitcoin };
			}
			return coin;
		});
	});
};

const markAllAsGoodCoins = () => {
	return store.update((old) => {
		return old.map((coin) => {
			return { ...coin, shitcoin: false };
		});
	});
};

const removeAllCoins = () => store.set([]);

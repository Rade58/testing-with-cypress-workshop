import { writable, derived } from 'svelte/store';
import { createCoin } from '$util/create-coin';

const store = writable<CoinType[]>(
	// THIS IS AN INITIAL VALUE
	[
		createCoin('Shiba Inu'),
		createCoin('Dogecoin'),
		createCoin('Ethereum'),
		createCoin('Bitcoin'),
		createCoin('Hedera'),
		createCoin('Decentraland', true)
	]
);

export const addCoin = (title: string) => store.update((old) => [...old, createCoin(title)]);

export const removeCoin = (id: number) =>
	store.update((old) => {
		return old.filter((coin) => {
			if (coin.id !== id) return coin;
		});
	});

export const toggle = (id: number) => {
	return store.update((old) => {
		return old.map((coin) => {
			if (coin.id === id) {
				return { ...coin, shitcoin: !coin.shitcoin };
			}
			return coin;
		});
	});
};

export const markAllAsLegitCoins = () => {
	return store.update((old) => {
		return old.map((coin) => {
			return { ...coin, shitcoin: false };
		});
	});
};

export const removeAllCoins = () => store.set([]);

// SECOND ARGUMENT WHEN MAKING DERIVED STORE
// THIS IS JUST THE STROR WHICH VALUE IS STRING
export const filterStore = writable('');

// DON'T EVER FORGET THTAT AS "MAIN" STORE DATA
// CHANGES `THE DERIVED STORE STATE WILL ALSO CHANGE`

// WE WILLL HAVE THREE STORES

// THIS DERIVED STORE WILL USE, OUR STORE OF COINS
// AND STORE THAT REPRESENT FILTER STRING
export const storeReadable = derived([store, filterStore], ([myStore, myFilterStore]) => {
	// IF THERE IS NO FILTER VALUE, RETURN ORIGINAL STORE
	if (!filterStore) return myStore;
	// RETURN FILTERED COINS, WHICH ARE FILTERED BY PROVIDED VALUE
	// FROM filterStore
	return myStore.filter((coin) => {
		return coin.title.toLowerCase().startsWith(myFilterStore.toLowerCase());
	});
});
// ONE FOR ALL COINS THAT ARE SHITCOINS
export const shitcoinsStore = derived(storeReadable, (_coins) => {
	return _coins.filter((coin) => {
		return coin.shitcoin === true;
	});
});
// AND ONE FOR ALL COINS THT ARE NOT SHITCOINS
export const legitCoinStore = derived(storeReadable, (_coins) => {
	return _coins.filter((coin) => {
		return coin.shitcoin === false;
	});
});

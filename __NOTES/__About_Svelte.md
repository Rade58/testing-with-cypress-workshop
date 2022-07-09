# YOU CAN PASS SERVER SIDE PROPS WITH SVELTE KIT; ALSO YOU CAN HAVE AN API BOUND TO THE ROUTE

SEE AN EXAMPLE

CHECK THIS ROUTE OF OUR APP: 

[src/routes/dog-facts](../src/routes/dog-facts)

**THIS IS OUR API ROUTE**

```
cat src/routes/dog-facts/api.ts
```

```ts
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

	const amount = searchParams.get('amount')?.toLowerCase();
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

```

**THIS IS THE PAGE WHERE WE USE `load`**

>> [load](https://kit.svelte.dev/docs/loading) is similar to getStaticProps or getServerSideProps in Next.js, except that load runs on both the server and the client. In the example above, if a user clicks on a link to this page the data will be fetched

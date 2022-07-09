# YOU CAN PASS SERVER SIDE PROPS WITH SVELTE KIT; ALSO YOU CAN HAVE AN API BOUND TO THE ROUTE

**THIS IS A `SVELTE KIT THING`**

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

	// THIS IS HOW I GET QUERYSTRING PARAMS
	const amount = searchParams.get('amount')?.toLowerCase();

	// USING THIS JUST TO SEE IF THIS IS WHAT I THINK IT IS
	// BUT LATTER ON I FOUND OUT THAT THIS IS UNDEFINED
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

```
cat src/routes/dog-facts/index.svelte
```

```svelte
<!-- DON'T FORGET THAT THIS script TAG NEEDS
TO HAVE context OF "module" -->
<script context="module" lang="ts">
  import type {Load} from '@sveltejs/kit'

  export const load:Load<any, {numberOfFacts: number; random: string, amount: number}> = async (loadEvent) => {

    const {params,url: {searchParams}} = loadEvent
    

    // JUST TO SEE IF I'LL HAVE ANYTHING ON THIS RECORD
    const amount = params["amount"]

    // THESE ARE QUERYSTRING PARAMS FOR SURE
    const againAmount = searchParams.get("amount")
    
    // IF USER DOESN'T USE QUERYSTRING
    // DEFAULT NUMBER WILL BE 3
    const amountNum = againAmount? +againAmount:3


    // SENDING SOME QUERY PARMAS DATA AS PROPS

    return {
      props: {
        // THESE ARE PROPS AS YOU SEE
        numberOfFacts: amountNum,
        // I ADDED SOME RANDOM PROP JUST TO PLAY AROUND
        random: "Shiba inu",
        amount
      }
    }

  }

</script>


<!-- WE ARE GOING TO USE OUR PROPS -->

<script lang="ts">

  // PROPS
  export let numberOfFacts: number;
  export let random: string;
  export let amount: number;

  console.log({numberOfFacts, random, amount})

  let facts: DogFact[];

  // FUNCTION FOR FETCHING FACTS
  const fetchFacts = () =>
    fetch(`/dog-facts/api?amount=${numberOfFacts}`)
    .then((res) => {
      return res.json()
    })
    .then(data => {
      
      console.log(data.amount)
      console.log({data})
      
      facts = data.facts
    })
    
</script>


<svelte:head>
  <title>{numberOfFacts} Dog Facts</title>
</svelte:head>

<section class="max-w-xl border-0 mx-auto mt-6">

  <h1 class="text-2xl">Dog Facts</h1>
  
  
  <p class="mb-6">How many dog facts would you like?</p>
  
  <form on:submit|preventDefault={fetchFacts}>
    <label for="number-of-facts" class="text-base text-primary">Number of Facts</label>
    <br/>
    <!-- YES IT IS POSIBLE TO BIND TO PROP -->
    <select
      bind:value={numberOfFacts}
      id="number-of-facts"
      class="select select-info w-full max-w-xs mb-2"
    >
      <option disabled selected>Select number of dog facts</option>
      {#each [1,2,3,4,5,6,7,8,9,10] as num}

        <option
          value={num}
        >
          {num} {num === 1 ? " Fact" : " Facts"}
        </option>
      {/each}
    </select>
    <br/>
    <button
      type="submit"
      data-test="fetch-button"
      class="btn btn-success"  
    >
      Fetch
    </button>
    <button 
      data-test="clear-button"
      on:click|preventDefault={() => (facts = [])}
      class="btn btn-warning"
    >
      Clear
    </button>
  </form>
  
  {#if facts}
  <div id="facts" class="mt-12">
    
    {#each facts as fact}

    <div class="border border-primary card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Dog Fact # {fact.id}</h2>
        <p>{fact.fact}</p>
        
      </div>
    </div>
    {/each}

  </div>
  {:else}
  <p class="text-center p-4 my-4" data-test="empty-state">Fetch some dog facts.</p>
  {/if}
</section>

```

#  THERE IS A ALSO A WAY TO DISABLE SSR PER PAGE

THIS IS HOW IT IS DONE

```
cat src/routes/crypto-pooper/__layout.svelte
```

```svelte
<script context="module" lang="ts">
  export const ssr = false;
</script>

<svelte:head>
  <title>Crypto Coins Stuff</title>
</svelte:head>

<div id="crypto-coins-application">
  <slot />
</div>
```


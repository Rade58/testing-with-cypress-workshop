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
      
      facts = data.facts
    })
    
</script>


<svelte:head>
  <title>{numberOfFacts} Dog Facts</title>
</svelte:head>

<h1>{numberOfFacts} Dog Facts</h1>





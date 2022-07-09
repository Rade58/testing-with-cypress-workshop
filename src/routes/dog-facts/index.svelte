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
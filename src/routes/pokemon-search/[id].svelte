<script context="module" lang="ts">
  import type {Load} from "@sveltejs/kit"

  // THIS IS A DYNAMIC PAGE
  // WE DEFINED INSIDE __layout
  // A PROGRAMMATIC NAVIGATION TO THIS PAGE

  // WE ALSO APPENDING QUERYSTRING  

  export const load: Load = async ({url: {searchParams}, params}) => {

    // BUT WE WON'T BE NEEDING QUERYSTRING
    // IT IS ONLY THERE AS A BACKUP METHOD OF GETTING POKEMONS (WON'T BE USING IT AT ALL)
    const name= searchParams.get("name")
  
    // WE FETCH DATA OF SINGLE POKEMON FROM OUR API ROUTE
    const endpoint = `/pokemon-search/api/${params.id}`

    const response = await fetch(endpoint)

    if(response.ok){

      const {pokemon} = await response.json()

      return {
        props: {
          pokemon
        }
      }
    }

    return {
      status: response.status,
      error: new Error(`Could not load ${name}.`)
    }

  }

</script>


<script lang="ts">

  const attributesWithLabels = {
    pokedex_number: 'Pokédex Number',
    hp: 'Hit Points',
    attack: 'Attack',
    defense: 'Defense',
    height_m: 'Height',
    weight_kg: 'Weight',
    speed: 'Speed',
    generation: 'Generation',
  };

  export let pokemon: PokemonType;

  $: console.log({pokemon})

  type PokemonAttributeType = keyof PokemonType

</script>


<svelte:head>
  <title>{pokemon.name}</title>
</svelte:head>

<header>
  <h1 class="text-primary">{pokemon.name}</h1>
  <ul>
    <li>{pokemon.japanese_name}</li>
    <li>{pokemon.classification}</li>
  </ul>
</header>

{#if pokemon.abilities}
<section class="my-4">
  <h2>Abilities:</h2>
  <ul class="abilities ml-8">
    {#each pokemon["abilities"] as ability}
      <li> - {ability}</li>
    {/each}
  </ul>
</section>
{/if}


<table class="w-full border-2 border-primary">
  <tbody>
    {#each Object.entries(attributesWithLabels) as entry}
      
      <tr>
        <th>{entry[1]}</th>

        <th>{pokemon[entry[0]]}</th>
      </tr>
    {/each}
  </tbody>
</table>
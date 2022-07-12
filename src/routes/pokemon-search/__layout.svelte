<!-- THIS PAGE HAS SO MANY THING
FOR EXAMPLE HOW SLOT AND LAYOUT ARE USED
BUT MANY OTHER THING
STUDY THIS PAGE AND YOU'LL FIND OUT A LOT ABOUT HOW SVELTE WORKS
-->


<script context="module" lang="ts">
  import type {Load} from '@sveltejs/kit'

  export const load: Load = async (event) => {
    // PASSING QUERYSTRING AS A PROP
    const searchTerm = event.url.searchParams.get("name")

    return {
      props: {
        searchTerm
      }
    }
  }
</script>

<script lang="ts">

  import {browser} from '$app/env'
  import {goto} from '$app/navigation'
  import {page} from '$app/stores'

  export let searchTerm = "";

  const emptyData = {pokemons: []}

  let controler: AbortController;

  let timer: ReturnType<typeof setTimeout>;

  let hasSearched = false;

  const searchFor = async (name: string) => {

    if(!name) return emptyData;

    if(controler) controler.abort();

    controler = new AbortController()

    try {
      const signal = controler.signal;
      const resp = await fetch(`/pokemon-search/api?name=${name}`, {
        signal
      })
      const data = await resp.json();

      return data
    }catch(err){
      if(err instanceof DOMException) return emptyData;
    }

  }

  const updateSearchTerm = (event: KeyboardEvent) => {
    const value = (event.target as HTMLInputElement).value;
    searchTerm = value;
    clearTimeout(timer);

    timer = setTimeout(() => {

      hasSearched = true;
      if(searchTerm){
        result = searchFor(searchTerm)
        const search = new URLSearchParams({name: searchTerm})
        if(browser){
          goto(`${$page.url.pathname}?${search}`, {replaceState: true, keepfocus: true})
        }        
      }

    }, 300)
  }

  let result = searchFor(searchTerm);

</script>

<!-- AS YOU NOTICED THIS FILE IS LAYOUT
WHICH MEANS THAT NEXT THINGS WILL BE RENDERED BOTH ON
          /pokemon-search      PAGE
          
          AND ON

          /pokemon-search/[id]   PAGE
        
        -->


<svelte:head>
  <title>Pokemon Search</title>
</svelte:head>

<div class="flex gap-8 mt-8 max-w-2xl mx-auto">
  <section class="w-1/3">
    <h1 class="text-xl">Pokemon Search</h1>
    <input
      id="search"
      data-test="search"
      value={searchTerm}
      on:keyup={updateSearchTerm}
      type="text" 
      placeholder="Search Pokemon" 
      class="input input-bordered input-primary w-full max-w-xs" 
    />
    <br />
    <label for="search" data-test="search-label">
      <strong>Searching for…</strong> {searchTerm}
    </label>

    <!-- RESULT -->
    
    {#await result}
    <p>Loading...</p>
    {:then {pokemons}}
      <div class="my-4 max-w-xl" data-test="results" >
        {#each pokemons as pokemon}
        {#if pokemon}  
        <article data-test="result">
          <a href="/pokemon-search/{pokemon.id}?name={searchTerm}"
            sveltekit:prefetch
            data-test-id={pokemon.id}
          >
            {pokemon.name}
          </a>
        </article>
        {:else}
          {#if hasSearched}
            <div class="empty-state" data-test="empty-state">
              No Pokemon match that query.
            </div>
          {/if}
        {/if}
        {/each}
        </div>
      {/await}
  </section>
  <section class="w-2/3">
    <slot />
  </section>
</div>
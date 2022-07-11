<script context="module" lang="ts">
  import type {Load} from '@sveltejs/kit'
  
  // https://github.com/sveltejs/kit/pull/2804#issuecomment-1009737824
  // THIS IS DEPRECATED
  // export const ssr = false;
  // WE MADE A HOOK LIKE THIS
  // https://kit.svelte.dev/docs/hooks#handle
  // CHECK 
  //              src/hooks.ts

  export const load: Load = async({fetch }) => {

    const {data}: SecretMenuItemAPIResponseType = 
      await fetch("/secret-menu/api")
      .then(res => {
        return res.json()
      })


    return {
      props: {
        data
      }
    }
  }
</script>


<script lang="ts">

  export let data: SecretMenuItemType[] = []


  const restaurants = [
    'Chick-fil-A',
    'McDonalds',
    'In-N-Out',
    'KFC',
    'Jack In The Box',
    'Jamba Juice',
    'Starbucks',
    'Dairy Queen',
    'Burger King',
    'Chipotle',
    'Taco Bell',
    'Five Guys',
    'Sonic',
    'Subway',
    'Panera Bread',
    // THIS WILL SECURE THAT TYPE ISN'T  string[]
    // IT IS GOING TO BE A ARRAY OF SPECIFIC STRINGS
    // YOU DEFINED
  ] as const;

  const ratings = [1, 2, 3, 4, 5, 6, 7] as const;

  let restaurant: typeof restaurants[number] | null = null

  let minimumRating: typeof ratings[number] = 1

  // STATE FOR CHECKBOXES
  let name = true;
  let whereToOrder = true;
  let description = true;
  let secret = true;
  let ingredients = true;
  let popularity = true;
  let price = true;
  let howToOrder = true;


  // THIS IS "STATE VALUE" THAT WILL DETERMINE 
  // WHICH RESTAUTANTS ARE GOING TO DISPLAY DATA
  $: visibleItems = data.filter(info => {
    if(restaurant && info.whereToOrder !== restaurant) return false;
    // NO IDEA WHY IS UNARY OPERATOR PLACED HERE
    // BECAUSE minimumRating IS ALWAYS NUMBER, ATLEAST I THINK THAT
    if(info.popularity < +minimumRating) return false;
    return true;
  });

  // THIS SUPOSED TO BE A VALID DATA THAT CAN BE WRITTEN INTO
  // .scv FILE
  // SO WHEN YOU HIT THIS URI
  // DOWNLOAD MENU (("SAVE AS" MENU SHOULD BE OPENED))
  // THIS WILL WORK IF YOU USE download ATTRIBUTE ON 
  // a TAG
  $: asCSV = encodeURI(
    "data:text/csv;charset=utf-8" + 
    visibleItems.map(item => {
      // EVERY PROPERTY VALUE IS
      // DEVIDED BY COMMAS AND
      // CONCATNATED INTO ONE STRING
      return Object.values(item).join(',')
    })
    // every item is devided by new line and concatanted
    // into one big string
    .join('\n')
  )

</script>

<svelte:head>
  <title>Secret Menu Items</title>
</svelte:head>

<header class="mx-10 my-12">
  <!-- DOWNLOAD LINK -->
  <h1 class="text-base">
    Secret Menu Items (<a
      href={asCSV}
      download="secret-menu-items"
      data-test="download=link"
      class="linkk link-primary"
    >Download</a>)
  </h1>
</header>


<!-- FORM CONTROLS -->

<div
  class="flex gap-6 my-4 mx-10"
>
  <section id="rating-visibility">
    <label for="minimum-rating-visibility"
      class="text-primary"
    >
      Minimum Rating: {minimumRating}
    </label>

    <input type="range" id="minimum-rating-visibility"
      min="1"
      max="7"
      class="block range range-secondary"
      bind:value={minimumRating}
      step="1"
    />
    <div class="w-full flex justify-between text-xs px-2">
      <span>|</span>
      <span>|</span>
      <span>|</span>
      <span>|</span>
      <span>|</span>
      <span>|</span>
      <span>|</span>
    </div>
  </section>

  <section id="restaurant-visibility">
    <label for="restaurant-visibility-filter" class="block text-primary">
      Restaurant
    </label>
    <select id="restaurant-visibility-filter"
      bind:value={restaurant}
      class="block select select-secondary"
    >
    <option disabled>Select Restaurant</option>
    <option value={null} selected>All</option>
      {#each restaurants as r}
        <option value={r}>{r}</option>
      {/each}
    </select>
  </section>

</div>


<!-- TABLE -->

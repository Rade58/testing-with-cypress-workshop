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


  // STATE FOR CHECKBOXES (FOR SHOWING CERTAIN COLUMN OR NOT)
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

  <section id="restaurant-visibility" class="ml-8">
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

  <section id="column-visibility"
    class="max-w-xl ml-8"
  >
    <h2 class="text-primary">Show Columns</h2>
    <div class="flex gap-2 flex-wrap">
      <div class="form-control">
        <label for="show-name" class="cursor-pointer label" >
          <input 
            id="show-name" 
            bind:checked={name}
            type="checkbox"
            class="checkbox checkbox-secondary"
            name="column-visibility"
          />
          <span class="inline-block label-text ml-2">Name</span>
        </label>
      </div>
      <div class="form-control">
        <label for="show-whereToOrder" class="cursor-pointer label" >
          <input 
            id="show-whereToOrder" 
            bind:checked={whereToOrder}
            type="checkbox"
            class="checkbox checkbox-secondary"
            name="column-visibility"
          />
          <span class="inline-block label-text ml-2">Where To Order</span>
        </label>
      </div>
      <div class="form-control">
        <label for="show-description" class="cursor-pointer label" >
          <input 
            id="show-description" 
            bind:checked={description}
            type="checkbox"
            class="checkbox checkbox-secondary"
            name="column-visibility"
          />
          <span class="inline-block label-text ml-2">Description</span>
        </label>
      </div>
      <div class="form-control">
        <label for="show-secret" class="cursor-pointer label" >
          <input 
            id="show-secret" 
            bind:checked={secret}
            type="checkbox"
            class="checkbox checkbox-secondary"
            name="column-visibility"
          />
          <span class="inline-block label-text ml-2">Secret</span>
        </label>
      </div>
      <div class="form-control">
        <label for="show-ingredients" class="cursor-pointer label" >
          <input 
            id="show-ingredients" 
            bind:checked={ingredients}
            type="checkbox"
            class="checkbox checkbox-secondary"
            name="column-visibility"
          />
          <span class="inline-block label-text ml-2">Ingredients</span>
        </label>
      </div>
      <div class="form-control">
        <label for="show-popularity" class="cursor-pointer label" >
          <input 
            id="show-popularity" 
            bind:checked={popularity}
            type="checkbox"
            class="checkbox checkbox-secondary"
            name="column-visibility"
          />
          <span class="inline-block label-text ml-2">Popularity</span>
        </label>
      </div>
      <div class="form-control">
        <label for="show-price" class="cursor-pointer label" >
          <input 
            id="show-price" 
            bind:checked={price}
            type="checkbox"
            class="checkbox checkbox-secondary"
            name="column-visibility"
          />
          <span class="inline-block label-text ml-2">Price</span>
        </label>
      </div>
      <div class="form-control">
        <label for="show-howToOrder" class="cursor-pointer label" >
          <input 
            id="show-howToOrder" 
            bind:checked={howToOrder}
            type="checkbox"
            class="checkbox checkbox-secondary"
            name="column-visibility"
          />
          <span class="inline-block label-text ml-2">How To Order</span>
        </label>
      </div>
    </div>
  </section>

</div>


<!-- TABLE -->

<div class="overflow-x-auto"
>
  <table class="table table-compact w-full">
    <thead>
      <tr>
        <th id="name-column" class:hidden={!name}>Name</th> 
        <th id="whereToOrder-column" class:hidden={!whereToOrder}>Where To Order</th> 
        <th id="description-column" class:hidden={!description}>Description</th> 
        <th id="secret-column" class:hidden={!secret}>Secret</th> 
        <th id="ingredients-column" class:hidden={!ingredients}>Ingredients</th> 
        <th id="popularity-column" class:hidden={!popularity}>Popularity</th> 
        <th id="price-column" class:hidden={!price}>Price</th> 
        <th id="howToOrder-column" class:hidden={!howToOrder}>How To Order</th> 
        
      </tr>
    </thead> 
    <tbody>

      {#each visibleItems as item}

        <tr>
          <td 
            headers="name-column"
            class="name"
            class:hidden={!name}
          >
            <a href={item.sourceUrl} class="link link-primary"
              target="_blank"
            >
              {item.name}
            </a>
          </td>
          <td 
            headers="whereToOrder-column"
            class="whereToOrder"
            class:hidden={!whereToOrder}
          >
              {item.whereToOrder} 
          </td> 
          <td 
            headers="description-column"
            class="description"
            class:hidden={!description}
          >
              {item.name} 
          </td> 
          <td 
            headers="secret-column"
            class="secret"
            class:hidden={!secret}
          >
              {item.secret} 
          </td> 
          <td 
            headers="ingredients-column"
            class="ingredients"
            class:hidden={!ingredients}
          >
              {item.ingredients} 
          </td>
          <td 
            headers="popularity-column"
            class="popularity"
            class:hidden={!popularity}
          >
              {item.popularity} 
          </td>
          <td 
            headers="price-column"
            class="price"
            class:hidden={!price}
          >
              {item.price} 
          </td>
          <td 
            headers="howToOrder-column"
            class="howToOrder"
            class:hidden={!howToOrder}
          >
              {item.howToOrder} 
          </td> 
        </tr>
          
      {/each}
      
    </tbody> 
    <!-- <tfoot>
      <tr>
        <th></th> 
        <th>Name</th> 
        <th>Job</th> 
        <th>company</th> 
        <th>location</th> 
        <th>Last Login</th> 
        <th>Favorite Color</th>
      </tr>
    </tfoot> -->
  </table>  

</div>


<footer class="my-6">
  (<a
    href="https://github.com/ali-ce/datasets/blob/master/Hack-the-menu-scrape/Secret%20Menu%20Items.csv"
    >Source</a
  >.)
</footer>


<style lan="scss">

  table {

    table-layout: fixed;
    /* position: static !important; */
  }

  td, th {
    /* display: flex; */
    max-width: 128px;
    /* text-overflow: ellipsis; */
    /* overflow-y: scroll; */
    /* word-wrap: wrap; */
    /* border-right: 2px crimson solid; */
    /* border-left: 2px crimson solid; */
    /* text-wrap:normal; */
    word-wrap:break-all !important;
    /* padding: 2px; */
    white-space: normal !important;
  }
  
  td {
    height: 120px;
    
  }

  /* th {
    position: sticky;
    top: 120px;
  } */


</style>
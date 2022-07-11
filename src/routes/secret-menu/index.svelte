<script context="module" lang="ts">
  import type {Load} from '@sveltejs/kit'
  export const ssr = false;

  export const load: Load = async({fetch}) => {

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
  )



</script>



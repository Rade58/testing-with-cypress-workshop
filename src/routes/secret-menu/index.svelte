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

</script>
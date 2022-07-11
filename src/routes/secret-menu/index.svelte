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

</script>
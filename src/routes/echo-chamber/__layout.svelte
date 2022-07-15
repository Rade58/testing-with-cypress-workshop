<script context="module" lang="ts">

  import type { Load} from '@sveltejs/kit'


  // OK, I'M HERE GOING TO DEAL WITH sessions OBJECT
  // THING I NEED YET TO DO IS TO FIND OUT
  // WHERE AN HOW user IS GOING TO BE INSERTED IN THIS
  // session OBJECT

  // I THINK THAT WE NEED TO DEFINE getSession HOOK WHERE WE WOLULD
  // HANDLE COOKIE, AND WHERE WE WOULD INSERT user
  // INTO session

  // WE WOULD DO THIS HERE:    src/hooks.ts


  // SEE THIS:     https://kit.svelte.dev/docs/hooks#getsession


  export const load: Load = async ({fetch, session}) => {

    const endpoint = "/echo-chamber/api/users"

    const response = await fetch(endpoint)

    const {user} = session as {user: {id: string; email: string}}




  }


</script>
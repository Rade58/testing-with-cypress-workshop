<script context="module" lang="ts">
  import type {Load} from '@sveltejs/kit'

  export const load: Load = async ({session}) => {

    const {user} = session as {user: UserType}

    if(user){
      return {
        status: 302,
        redirect: '/echo-chamber/posts'
      }
    }

    return {}

  }
</script>

<p class="my-16 ml-4 text-md text-primary">
  <span class="text-xl">
    👆🏾
  </span> Sign in or create an account.</p>
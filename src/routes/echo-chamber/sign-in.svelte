<script context="module" lang="ts">
  import type {Load} from '@sveltejs/kit'

  export const load: Load = async ({url: {searchParams}, session}) => {

    const error = searchParams.get("error");

    const {user} = session as {user: UserType}

    if(user){
      return {
        status: 302,
        redirect: '/echo-chamber/posts'
      }
    }

    return {
      props: {error}

    }

  }

</script>
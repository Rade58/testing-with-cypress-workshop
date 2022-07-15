<script context="module" lang="ts">

  import type {Load} from '@sveltejs/kit'
  import type {Post} from '@prisma/client'

  export const load: Load = async ({fetch, session}) => {

    const endpoint = '/echo-chamber/api'

    const response = await fetch(endpoint)

    const {user} = session as {user: UserType}

    if(!user){
      return {
        status: 302,
        redirect: '/echo-chamber/sign-in'
      }
    }

    if(response.ok){
      const {posts} = await response.json() as {posts: Post[]}

      return {
        props: {
          posts, user
        },
        stuff: {
          posts, user
        }
      }

    }

    return {
      status: response.status,
      error: new Error("Something went wrong!")
    }

  }

</script>


<script lang="ts">
  // toto create two components for creating post and previewing it
</script>

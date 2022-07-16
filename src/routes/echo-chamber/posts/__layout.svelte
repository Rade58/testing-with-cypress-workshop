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

    ;
    if(response.ok){
      const {posts} = await response.json() as {posts:(Post & {
        author: {
          id: number;
          email: string;
      } | null;
      })[] }

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
  import CreatePost from './_create-post.svelte'
  import PreviewPost from './_preview-post.svelte'


  export let posts: (Post & {
    author: {
        id: number;
        email: string;
    } | null;
    })[];
  export let user: UserType;

</script>


<div class="grid grid-cols-1 lg:grid-cols-3 gap-2 border">
  <CreatePost {user} />
  <div  class="content col-span-1 lg:col-span-2 row-span-2">
    <slot />
  </div>
  <section id="posts" data-test="post-preview-list"
  class="flex flex-col gap-2 max-w-2xl mx-auto"
  >
    {#each posts as post (post.id)}
      <PreviewPost {post} />
    {/each}
  </section>
</div>

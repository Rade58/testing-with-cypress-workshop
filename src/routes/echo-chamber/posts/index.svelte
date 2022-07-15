<script context="module" lang="ts">
  
  import type {Load} from '@sveltejs/kit'
  import type {Post} from '@prisma/client'

  export const load: Load = async ({stuff}) => {

    return {
      props: {
        // eslint-disable-next-line
        // @ts-ignore
        posts: stuff.posts
      }
    }
  }


</script>

<script lang="ts">
  export let posts: Post[]
</script>


<div class="flex flex-col place-items-center mt-12" data-test="post-empty-state">
  {#if posts.length}
    <p data-test="post-empty-state-has-posts">Select a hot take.</p>
  {:else}
    <p data-test="post-empty-state=has=no=posts">Add your first hot take.</p>
  {/if}
</div>
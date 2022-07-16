<script context="module" lang="ts">

  import type {Load} from '@sveltejs/kit'
  import type {Post} from '@prisma/client'
  
  import {focusOnMount} from '$util/focus-on-mount'

  export const load: Load = async ({fetch, url: {searchParams}, params}) => {

    const endpoint = `/echo-chamber/api/${params.id}`;
    const hasEditing = searchParams.has("editing");

    const response = await fetch(endpoint);


    if(response.ok){

      const {post} = await response.json() as { post: (Post & {
          author: {
              id: number;
              email: string;
          } ;
        })}

      return {
        props: {
          post,
          hasEditing
        }
      }

    }

    return {
      status: response.status,
      error: new Error(`Couldn't load ${endpoint}`)
    }

  }


</script>


<script lang="ts">
  import {goto, invalidate} from '$app/navigation'
  import {page} from '$app/stores'

  export let post: (Post & {
          author: {
              id: number;
              email: string;
          } ;
        })

  $: draft = post.content;
  $: isEditing = $page.url.searchParams.has("editing");

  const updatePost = () => {
    return fetch(`/echo-chamber/api/posts/${post.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `content=${draft}`
    })
    .then(response => {
      if(response.ok){
        invalidate(`/echo-chamber/api/${post.id}`)
        invalidate(`/echo-chamber/api`)
      }
    })
  }

  const deletePost = () => {
    return fetch(`/echo-chamber/api/posts/${post.id}`, {
      method: "DELETE",

    })
    .then((response) => {
      if(response.ok){
        invalidate(`/echo-chamber/api`);
        goto('/echo-chamber/posts');
      }
    })
  }


</script>


<article class="w-full flex gap-2 justify-end"
  id="post-detail-{post.id}"
  data-test="post-detail"
>
  <header class="flex content-between mb-6">
    <div class="w-full">
      <a href="/echo-chamber/posts"
        data-test="post-detail-back-arrow"
        sveltekit:noscroll
      >
      &arr; Close
      </a>
    </div>
    <div class="w-full flex gap-2 justify-end">
      <div data-test="post-detail-controls">
        {#if !isEditing}
          <a href="btn btn-xs btn-secondary"
            sveltekit:noscroll
            data-test="post-detail-controls-edit-button"
          >
            Edit
          </a>
        {:else}
          <a href="btn btn-xs btn-secondary"
          sveltekit:noscroll
            data-test="post-detail-controls-cancel-button"
          >
            Cancel
          </a>
        {/if}
      </div>
      <form 
        action="/echo-chamber/posts{post.id}?_method=DELETE"
        method="post"
        on:submit|preventDefault={deletePost}
        ddata-test="post-detail-controls-delete-button"
      >
        <button class="btn btn-error" type="submit">
          Delete
        </button>
      </form>
    </div>
  </header>
  <p data-test="post-detail-metadata">
    At the exact moment of {post.createdAt}, {post.author.email}'s deepest thought was...
  </p>
  <p class="text-center text-3xl my-4 font-serif italic">
    <span class="text-cyan-600">“</span>
    <span
      data-test="post-detail-content"
    >
      {post.content}
    </span>
    <span class="text-cyan-600">“</span>
  </p>
  {#if isEditing}
  <form
    class="post-edit"
    action="/echo-chamber/posts/{post.id}?_method=PATCH"
    method="post"
    data-test="post-detail-draft-content"
  >
    <input type="text"
      class="input input-primary"
      name="text"
      use:focusOnMount
      bind:value={draft}
      data-test="post-detail-draft-content"
    />
  </form>
  {/if}
</article>


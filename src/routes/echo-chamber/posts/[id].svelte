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

  let draft = post.content;
  $: isEditing = $page.url.searchParams.has("editing");
      
  const updatePost = () => {
    
    // const formData = new FormData()

    // formData.set("content", draft)

    return fetch(`/echo-chamber/api/${post.id}`, {
      method: "PATCH",
      headers: {
        // "Content-Type": "application/json"
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `content=${draft}`
      // body: formData
    })
    .then(response => {
      console.log("UPDATED")

      if(response.ok){
        invalidate(`/echo-chamber/api/${post.id}`)
        invalidate(`/echo-chamber/api`)
        invalidate(`/echo-chamber/posts/${post.id}`)
        goto(`/echo-chamber/posts/${post.id}`)
      }
    })
  }

  const deletePost = () => {
    return fetch(`/echo-chamber/api/${post.id}`, {
      method: "DELETE",

    })
    .then((response) => {

      console.log("DELETED")

      if(response.ok){
        invalidate(`/echo-chamber/api/${post.id}`)
        invalidate(`/echo-chamber/api`);
        invalidate(`/echo-chamber/posts/${post.id}`)
        goto('/echo-chamber/posts');
      }
    })
  }


</script>


<article class="max-w-2xl mt-8 mx-auto border border-info p-6 mb-4"
  id="post-detail-{post.id}"
  data-test="post-detail"
>
  <header class="flex content-between mb-6">
    <div class="w-full">
      <a href="/echo-chamber/posts"
        data-test="post-detail-back-arrow"
        sveltekit:noscroll
        class="btn btn-info mr-12"
      >
      &larr; Close
      </a>
    </div>
    <div class="w-full flex gap-2 justify-end">
      <div data-test="post-detail-controls">
        {#if !isEditing}
          <a href="{$page.url.pathname}?editing"
            sveltekit:noscroll
            data-test="post-detail-controls-edit-button"
            class="btn btn-primary"
          >
            Edit
          </a>
        {:else}
          <a href="{$page.url.pathname}"
          sveltekit:noscroll
            data-test="post-detail-controls-cancel-button"
            class="btn btn-warning"
          >
            Cancel
          </a>
        {/if}
      </div>
      <form 
        on:submit|preventDefault={deletePost}
        method="post"
        action="/echo-chamber/api/{post.id}?_method=delete"
        data-test="post-detail-controls-delete-button"
      >
        <button class="btn btn-error" type="submit">
          Delete
        </button>
      </form>
    </div>
  </header>
  <p data-test="post-detail-metadata">
    At the exact moment of {new Date(post.createdAt).toLocaleDateString("en-US")}, {post.author.email}'s deepest thought was...
  </p>
  <p class="w-full text-center text-3xl my-4 font-serif italic">
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
    on:submit|preventDefault={updatePost}
    action="/echo-chamber/api/{post.id}?_method=PATCH"
    method="post"
    class="post-edit"
    data-test="post-detail-draft-content"
  >
    <input type="text"
      class="input input-primary"
      name="text"
      use:focusOnMount
      bind:value={draft}
      data-test="post-detail-draft-content"
    />
    <button
      type="submit"
      data-test="post-detail-edit-submit"
      class="btn btn-primary ml-2"
    >Update</button>
  </form>
  {/if}
</article>


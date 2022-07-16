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
  $: isEditing: $page.url.searchParams.has("editing")
  
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

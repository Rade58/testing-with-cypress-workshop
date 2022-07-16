<!-- THESE UNDERSCORED FILES
_create_post    AND    _post_review
ARE JUST COMPONENTS I'M GOING TO IMPORT AND USE
-->
<script lang="ts">
  import { goto, invalidate } from '$app/navigation';
  import type {Post} from '@prisma/client'

  const endpoint = '/echo-chamber/api'

  export let user: UserType;

  const createPost = (event: SubmitEvent) => {
    const form = event.target as HTMLFormElement | null
    
    if(!form) return;

    const formData = new FormData(form);

    const content = formData.get("content")
    const authorId = formData.get("authorId")

    // return

    fetch(endpoint, {
      body: JSON.stringify({
        content, authorId
      }),
      headers: {
        "accept": "application/json",
        // "Content-Type": "application/json"
      },
      method: "POST"
    })
    .then((response) :Promise<{post: Post}> | null => {
      if(response.ok){
        return response.json()
      }else{
        return null
      }
    })
    .then(data => {

      console.log({data})

      return data?.post
    })
    .then((post) => {
      if(post){
        
        return goto(`/echo-chamber/posts/${post?.id}`)
      }
    })
    .then(() => {
      return invalidate(endpoint)
    })

  }


</script>

<form 
  id="new-post"
  class="max-w-2xl mx-auto my-16"
  data-test="create-post-form"
  on:submit|preventDefault={createPost}>
  <input type="text" name="content"
    id="content"
    aria-label="New Post"
    required
    data-post="post-create-content-input"
    class="input input-primary"
    placeholder="Create post"
  />
  <input type="hidden" id="authorId" name="authorId" value={user.id}>
  <br/>
  <button type="submit" 
    class="btn btn-primary mt-4"
    data-test="post-create-submit"
  >Post</button>
</form>


<script lang="ts">
  import {page} from '$app/stores'
  import type {Post} from '@prisma/client'

  export let post: (Post & {
    author: {
        id: number;
        email: string;
    } | null;
    });

  $: active = +$page.params.id === post.id

</script>

<a 
  href="/echo-chamber/posts/{post.id}"
  class="ml-8 card h-36 card-side bg-base-100 shadow-xl" sveltekit:noscroll
    id="post-preview-{post.id}"
    class:active

  >
  <figure><img src="https://placeimg.com/200/280/arch" alt="Movie"></figure>
  <div class="card-body">
    <h2 
      data-test="post-preview-{post.id}-content"
    class="posst-content card-title">{post.content}</h2>
    <p class="post-metadata"
      data-test="post-preview-{post.id}-metadata"
    >
      - <span class="post-preview-author"
        data-test="post-preview-{post.id}-author"
      >
        {post.author?.email}
      </span>,
      <span class="post-preview-datetime"
        data-test="post-preview-{post.id}-datetime"
      >
        {new Date(post.createdAt).toLocaleDateString("en-US")}
      </span>
    </p>
    <!-- <div class="card-actions justify-end">
      <button class="btn btn-primary">Watch</button>
    </div> -->
  </div>
</a>
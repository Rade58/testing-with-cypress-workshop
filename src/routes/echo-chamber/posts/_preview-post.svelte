<script lang="ts">
  import {page} from '$app/stores'
  import type {Post} from '@prisma/client'

  export let post: Post;

  $: active = +$page.params.id === post.id

</script>
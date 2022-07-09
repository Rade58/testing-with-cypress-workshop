<!-- <h1>Welcome to SvelteKit</h1> -->
<!-- <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p> -->
<script lang="ts">
  import { onMount } from "svelte";
  import {toast} from '@zerodevx/svelte-toast'

  onMount(() => {
    setTimeout(() => {
      toast.push("Hello goblin, How are you");
      console.log("You are a goblin")
    }, 10000)
  })

</script>


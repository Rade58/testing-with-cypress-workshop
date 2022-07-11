<script lang="ts">
  import {onMount, onDestroy} from 'svelte'
  import {toast} from '@zerodevx/svelte-toast'

  let count = 0;
  let interval: ReturnType<typeof setInterval>

  onMount(() => {
    console.log("Mounted");
    interval = setInterval(() => {
      count++;
    }, 1000)
  })

  onDestroy(() => {
    clearInterval(interval)
  })

  const writeToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.push(`Wrote "${text}" to the clipboard.`);
      })
      .catch(console.error)
  }


</script>

<h1 class="mx-auto max-w-xl mt-8 text-2xl">This page has been loaded for {count} seconds.</h1>

<section class="mx-auto max-w-xl mt-8">
  <button
    class="btn btn-primary btn-sm"
    on:click={() => writeToClipboard("Foo")}
  >
    Foo
  </button>
  <button
    class="btn btn-primary btn-sm"
    on:click={() => writeToClipboard("Bar")}
  >
    Bar
  </button>
  <button
    class="btn btn-primary btn-sm"
    on:click={() => writeToClipboard("Baz")}
  >
    Baz
  </button>
</section>
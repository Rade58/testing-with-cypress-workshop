<script lang="ts">
  import {toggle, removeCoin } from '$stores/coins'

  export let title: string;
  export let coins: CoinType[]

</script>

<section data-test="coins-{title}">
  <h1>{title}</h1>
  <ul>
    {#if !coins || coins.length ===0}
    <p data-test="coins-empty-state" 
    class="font-light text-purple-600">
      No items to show.
    </p>
    {:else}
      {#each coins as coin (coin.id)}
        <li>
          <label for="coin-{coin.id}">
            <input
              type="checkbox"
              id="coin-{coin.id}"
              checked={coin.shitcoin} 
            />
          </label>
          <button
            data-test="remove"
            class="btn btn-sm btn-primary"
            on:click={() => removeCoin(coin.id)}
          >
            Remove
          </button>
        </li>
      {/each}
    {/if}
  </ul>

</section>
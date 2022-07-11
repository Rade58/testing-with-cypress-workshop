<script lang="ts">
  import CoinList from "$components/CoinList.svelte";
  import {
    legitCoinStore,
    shitcoinsStore,
    filterStore,
    addCoin,
    markAllAsLegitCoins,
    removeAllCoins} from '$stores/coins'

  let newCoinName = "";

  const addNewCoin = (e: Event) => {
    addCoin(newCoinName);
    // reseting value
    newCoinName = "";
  }

</script>

<svelte:head>
  <title>Crypto-Pooper</title>
</svelte:head>


<form on:submit|preventDefault={addNewCoin}
  class="flex max-w-xl mx-auto mt-14 items-end"
>
  <div class="w-full">
    <label for="new-coin-input">Coin</label>
    <br />
    <input
      class="input input-bordered input-primary"
      type="text" 
      placeholder="New Coin"
      data-test="new-coin-input"
      bind:value={newCoinName}
      required
      id="new-coin-input"
    />
  </div>
  <button
    class:btn-disabled={!newCoinName}
    disabled={!newCoinName}
    class="btn btn-secondary"
    type="submit"
    id="add-coin"
    data-test="add-coin"
  >
    Add Coin
  </button>
</form>

<div class="mt-6 max-w-xl mx-auto">
  <label for="filter-coins">Filter</label>
  <br/>
  <input
    type="text"
    data-test="filter-coins"
    id="filter-coins"
    placeholder="Filter Coins"
    bind:value={$filterStore}
    class="input input-bordered input-primary w-full"
  />
</div>

<section data-test="coins" class="flex gap-3 justify-between max-w-xl mx-auto mt-9">
  <CoinList title="Legit Coins" coins={$legitCoinStore} />
  <CoinList title="Shitcoins" coins={$shitcoinsStore} />
</section>

<footer class="flex gap-2 max-w-xl mx-auto mt-9">
  <button
    on:click={markAllAsLegitCoins}
    data-test="mark-all-as-legit"
    class="btn btn-primary"
  >
    Mark All As Legit Coins
  </button>
  <button
    on:click={removeAllCoins}
    data-test="remove-all"
    class="btn btn-primary"
  >
    Remove All coins
  </button>
</footer>



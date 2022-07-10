<script lang="ts">
  import CoinList from "$components/CoinList.svelte";
  import {
    legitCoinStore,
    shitcoinsStore,
    filterDerivateStore,
    addCoin,
    markAllAsLegitCoins,
    removeAllCoins} from '$stores/coins'

  let newCoinName = "";
</script>

<svelte:head>
  <title>Crypto-Pooper</title>
</svelte:head>

<section data-test="coins" class="flex gap-3 justify-between max-w-xl mx-auto mt-9">
  <CoinList title="Legit Coins" coins={$legitCoinStore} />
  <CoinList title="Shitcoins" coins={$shitcoinsStore} />
</section>

<footer>

</footer>



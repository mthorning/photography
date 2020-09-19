<script>
  import { onMount } from 'svelte'
  let orderId, type
  onMount(() => {
    let params = new URLSearchParams(window.location.search)
    type = params.get('type')
    orderId = params.get('order_id')
  })
</script>

<style>
  div {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>

<div>
  <h1>
    Thank you
    {#if type}for your {type}{/if}
  </h1>
  {#if orderId}
    <p>Your order ID is {orderId}</p>
  {/if}
</div>

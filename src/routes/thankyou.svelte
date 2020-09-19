<script>
  import { onMount } from 'svelte'
  let orderId

  onMount(() => {
    let params = new URLSearchParams(window.location.search)
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
  <h1>Thank you for your order</h1>
  {#if orderId}
    <p>Your order ID is {orderId}</p>
  {/if}
</div>

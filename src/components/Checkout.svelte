<script>
  import { onMount } from 'svelte'
  import { goto } from '@sapper/app'
  export let selectedPrint

  let paypal

  const description = `${selectedPrint.x} x ${selectedPrint.y} ${selectedPrint.title}`

  onMount(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          console.log(selectedPrint, data, actions)
          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
              {
                description,
                amount: {
                  currency_code: 'GBP',
                  value: selectedPrint.price.toFixed(1),
                },
              },
            ],
          })
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture()
          console.log(order)
        },
        onError: (err) => {
          goto('/paypal-error')
        },
      })
      .render(paypal)
  })
</script>

<div bind:this={paypal} />

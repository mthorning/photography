<script context="module">
  export async function preload() {
    const res = await this.fetch(
      'https://paypal.com/sdk/js?client-id=AaMliqu5imE0tofHmYsEHDgJ23nGUtQs9z4g-KYY7Vbt19hmzXnAL4RFvI2lPajzmQAxaNFM3N8ZTuMx&currency=GBP'
    )
    if (res.status === 200) {
      console.log(res)
    }
  }
</script>

<script>
  import { onMount } from 'svelte'

  onMount(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
              {
                description: 'the best photo ever',
                amount: {
                  currency_code: 'GBP',
                  value: 500.0,
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
          console.error(err)
        },
      })
      .render('#paypal-button-container')
  })
</script>

<div id="paypal-button-container" />

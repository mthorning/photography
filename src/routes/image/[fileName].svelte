<script context="module">
  export async function preload(page, session) {
    const { fileName } = page.params
    const res = await this.fetch(`image/${fileName}.json`)
    if (res.status === 200) {
      const image = await res.json()
      return { image }
    }

    this.error(404, 'Not Found')
  }
</script>

<script>
  import { goto } from '@sapper/app'
  import ImageWithMeta from '../../components/ImageWithMeta.svelte'
  import Checkout from '../../components/Checkout.svelte'
  export let image

  $: printSizes =
    true && image.meta.printSizes
      ? image.meta.printSizes.sort((a, b) => a.price - b.price)
      : []
</script>

<style>
  div {
    background: #19191c;
    margin: 0 -32px;
    padding: 32px;
  }
  h2 {
    border-top: 1px solid #777;
    padding-top: 20px;
  }
  h1 {
    border-bottom: 1px solid #777;
    padding-bottom: 20px;
    margin-bottom: 60px;
  }
  .description {
    padding: 50px 0;
  }
  footer {
    display: flex;
    justify-content: space-between;
    font-weight: 300;
    margin-top: 60px;
    padding: 20px 20px 0 20px;
    border-top: 1px solid #777;
  }
  a {
    text-decoration: none;
  }
  table {
    margin: 50px auto;
    max-width: 450px;
    width: 100%;
    text-align: center;
    border-collapse: collapse;
  }
  td {
    padding: 8px;
    border-top: 1px solid #777;
  }
</style>

<svelte:head>
  <title>{image.fileName}</title>
</svelte:head>

<div>
  <h1>{image.fileName.split('-')[1].replace(/_/g, ' ')}</h1>
  {#each [image] as image (image.fileName)}
    <ImageWithMeta {...image} />
  {/each}
  {#if image.meta && image.meta.description}
    <p class="description">{image.meta.description}</p>
  {/if}
  {#if printSizes && printSizes.length}
    <h2>Prints</h2>
    <p>
      I want to make my images available to purchase as prints though I'm still
      looking in to the best options to offer so if you don't see what you would
      like then please contact me. The sizes available to purchase are likely to
      vary from image to image due to the resolution of my camera and how
      heavily I have cropped each image.
    </p>
    <p>
      For this image I would be able to provide the following sizes (in inches):
    </p>
    <table>
      <thead>
        <th>Size (in)</th>
        <th>Size (approx. cm)</th>
        <th>Paper</th>
        <th>Price</th>
      </thead>
      <tbody>
        {#each printSizes as print}
          <tr>
            <td>{print.x} x {print.y}</td>
            <td>{Math.round(print.x * 2.54)} x {Math.round(print.y * 2.54)}</td>
            <td>{print.paper}</td>
            <td>£{print.price}</td>
          </tr>
        {/each}
      </tbody>
    </table>
    <p>
      The lead time for printing is approximately 5 days but I want to check the
      prints personally before sending them so please allow 7 - 10 days for
      delivery (UK only, please contact me if you require international
      delivery).
    </p>
    <p>
      I haven't gotten around to sorting out purchases throught this site yet,
      but if you would like a print then please contact me at
      <a href="mailto:prints@matt-thorning.dev">prints@matt-thorning.dev</a>
      and I will invoice you through PayPal.
    </p>
  {/if}
  <Checkout />
  <footer>
    <a href={`/image/${image.previous}`}>previous</a>
    <a href={`/image/${image.next}`}>next</a>
  </footer>
</div>

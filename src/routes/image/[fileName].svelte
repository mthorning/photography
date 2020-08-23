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
  export let image
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
  <footer>
    <a href={`/image/${image.previous}`}>previous</a>
    <a href={`/image/${image.next}`}>next</a>
  </footer>
</div>

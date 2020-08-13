<script context="module">
  export async function preload(page, session) {
    const res = await this.fetch('index.json')
    if (res.status === 200) {
      const images = await res.json()
      return { images }
    }
    this.error(404, 'Not Found')
  }
</script>

<script>
  import { goto } from '@sapper/app'
  import Thumbnail from '../components/Thumbnail.svelte'
  import Lightbox from '../components/Lightbox.svelte'
  export let images = []

  let selectedIdx
  $: selectedImage = images[selectedIdx]

  function onImageClick(e) {
    e.stopPropagation()
    goto(`/image/${selectedImage.fileName}`)
  }
</script>

<style>
  div {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, max-content));
    grid-gap: 16px;
    justify-content: center;
    padding: initial;
  }
  :global(.pointer) {
    cursor: pointer;
  }
  @media (min-width: 580px) {
    div {
      grid-template-columns: repeat(auto-fit, minmax(250px, max-content));
    }
  }
</style>

<svelte:head>
  <title>Gallery</title>
</svelte:head>

<div>
  {#if !images || !images.length}
    <h5>I thought I had more images than this...</h5>
  {:else}
    {#each images as image, index}
      <Thumbnail {...image} on:click={() => (selectedIdx = index)} />
    {/each}
  {/if}
  {#if selectedImage}
    <Lightbox
      on:click={onImageClick}
      class="pointer"
      {...selectedImage}
      close={() => (selectedIdx = -1)}
      next={() => (selectedIdx = selectedIdx === images.length - 1 ? 0 : selectedIdx + 1)}
      previous={() => (selectedIdx = selectedIdx === 0 ? images.length - 1 : selectedIdx - 1)} />
  {/if}
</div>

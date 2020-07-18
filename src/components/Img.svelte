{#each [src] as src (src)}
<img
         height={height}
  key={src}
  use:setOnLoad
  on:click
  class={extraClasses}
  class:loaded
  loading="lazy"
  decoding="async"
  alt={alt || ''}
  src={src}
/>
{/each}

<script>
  export let src;
  export let alt;
  export let height;

  let extraClasses
  export { extraClasses as class }

  let image;
  let loaded = false;

  function setOnLoad(image) {
      if(image.complete) {
          loaded = true
      } else {
        image.onload = () => {
          loaded = true;
        };
      }
  }
</script>


<style>
    img {
      opacity: 0;
      transition: all 1s ease;
    }
    .loaded {
      opacity: 1;
    }
</style>

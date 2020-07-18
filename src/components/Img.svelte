{#each [src] as src (src)}
<img
  key={src}
  use:setOnLoad
  on:click
  class={extraClasses}
  class:loaded
  loading="lazy"
  decoding="async"
  alt={alt || ''}
  src={src}
  height={height}
  width={width}
/>
{/each}

<script>
  export let src, alt, height, width;
  export let afterLoaded = () => {};

  let extraClasses
  export { extraClasses as class }

  let image;
  let loaded = false;

  function setOnLoad(image) {
      if(image.complete) {
          loaded = true
          afterLoaded(image)
      } else {
        image.onload = () => {
          loaded = true
          afterLoaded(image);
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

<a 
    class="thumbnail" 
    href={`/gallery/${fileName}`}
    rel=prefetch
>
    <img 
        alt={fileName}
        src={`images/thumbnails/${fileName}.${type}`} 
        loading="lazy"
        decoding="async"
        class:isPortrait 
     /> 
</a>

<script>
    export let isPortrait, fileName, type;
</script>


<style>
    a {
      position: relative;
      width: 200px;
      height: 200px;
      margin: 4px;
      overflow: hidden;
    }
    a img {
      position: absolute;
      left: 50%;
      top: 50%;
      height: 100%;
      width: auto;
      transform: translate(-50%,-50%);
    }
    a img.isPortrait {
      width: 100%;
      height: auto;
    }
</style>

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
      width: 140px;
      height: 140px;
      overflow: hidden;
      border: 1px solid #f0f0f0;
      float: left;
    }
    a img {
      position: absolute;
      left: 50%;
      top: 50%;
      height: 105%;
      width: auto;
      transform: translate(-50%,-50%);
    }
    a img.isPortrait {
      width: 100%;
      height: auto;
    }
    @media (min-width: 580px) {
      a {
          width: 250px;
          height: 250px;
      }
    }
</style>

<div 
    on:click
    class="thumbnail" 
>
    <img 
        alt={fileName}
        src={`images/thumbnails/${fileName}.${type}`} 
        loading="lazy"
        decoding="async"
        class:isPortrait 
     /> 
</div>

<script>
    export let isPortrait, fileName, type;
</script>


<style>
    div {
      cursor: pointer;
      position: relative;
      width: 140px;
      height: 140px;
      overflow: hidden;
      border: 1px solid #f0f0f0;
      float: left;
    }
    div img {
      position: absolute;
      left: 50%;
      top: 50%;
      height: 105%;
      width: auto;
      transform: translate(-50%,-50%);
    }
    div img.isPortrait {
      width: 105%;
      height: auto;
    }
    @media (min-width: 580px) {
      div {
          width: 250px;
          height: 250px;
      }
    }
</style>

<script>
    export let fileName, extension, height, width, clickHandler;
    let isPortrait = height > width;
</script>

<div 
    class="thumbnail" 
    on:click={() => clickHandler({ fileName, extension, isPortrait })}
>
    <img 
       src={`images/thumbnails/${fileName}${extension}`} 
       class:isPortrait 
     /> 
</div>

<style>
    div {
      position: relative;
      width: 200px;
      height: 200px;
      margin: 4px;
      overflow: hidden;
    }
    div img {
      position: absolute;
      left: 50%;
      top: 50%;
      height: 100%;
      width: auto;
      transform: translate(-50%,-50%);
    }
    div img.isPortrait {
      width: 100%;
      height: auto;
    }
</style>

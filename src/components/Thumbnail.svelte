<div 
    class="thumbnail" 
    on:click
>
    <img 
        alt={fileName}
        src={`images/thumbnails/${fileName}.${type}`} 
        class:isPortrait 
     /> 
</div>

<script>
    export let isPortrait, fileName, type;
</script>


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

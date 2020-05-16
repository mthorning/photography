<script>
    export let path, fileName, extension, height, width;

    let image;

</script>

<div class="thumbnail">
    <a href={`gallery/${fileName}${extension}`}>
    <img 
       src={`${path}/thumbnails/${fileName}${extension}`} 
       class:active={height > width} 
        bind:this={image} 
     /> 
</a>
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
    div img.active {
      width: 100%;
      height: auto;
    }
</style>

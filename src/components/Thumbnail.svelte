<div 
    class="thumbnail" 
>
    <Img 
        on:click
        class={`img ${isPortrait ? 'isPortrait' : ''}`}
        alt={fileName}
        src={`images/thumbnails/${fileName}.${type}`} 
     /> 
</div>

<script>
    import Img from '../components/Img.svelte';
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
    @media (min-width: 580px) {
      div {
          width: 250px;
          height: 250px;
      }
    }
    :global(.img) {
      position: absolute;
      left: 50%;
      top: 50%;
      height: 105%;
      width: auto;
      transform: translate(-50%,-50%);
    }
    :global(.isPortrait) {
      width: 105%;
      height: auto;
    }
</style>

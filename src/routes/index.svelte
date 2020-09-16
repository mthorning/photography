<script>
  import Watermark from '../components/Watermark.svelte'
</script>

<style>
  div {
    padding-top: 100px;
    max-width: 700px;
    margin: auto;
  }
  h3 {
    text-align: right;
  }
</style>

<svelte:head>
  <title>MattThorning</title>
</svelte:head>

<div>
  <Watermark>
    <h3>photography</h3>
  </Watermark>
</div>

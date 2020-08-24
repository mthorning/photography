<script>
  import Nav from '../components/Nav.svelte'

  export let segment
</script>

<style>
  main {
    min-height: calc(100vh - 57px);
    max-width: 137em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>

<Nav {segment} />

<main>
  <slot />
</main>

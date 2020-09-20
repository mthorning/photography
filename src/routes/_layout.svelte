<script>
  import { afterUpdate } from 'svelte'
  import Nav from '../components/Nav.svelte'

  export let segment
  let pathname
  afterUpdate(() => {
    pathname = window.location.pathname
  })
</script>

<style>
  main {
    height: 100vh;
    max-width: 137em;
    margin: 0 auto;
    box-sizing: border-box;
  }
  .background {
    background-image: url(/misty-truro.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
</style>

<main class:background={pathname === '/'}>
  <Nav {segment} />
  <slot />
</main>

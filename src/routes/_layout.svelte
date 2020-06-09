<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style>
	main {
                min-height: calc(100vh - 57px);
		max-width: 56em;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>

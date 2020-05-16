<script context="module">
    export async function preload(page, session) {
        const res = await this.fetch('gallery.json');
        const images = await res.json();
        return { images }
    }
</script>

<script>
    import Thumbnail from '../../components/Thumbnail.svelte';
    export let images;
</script>

<svelte:head>
	<title>Gallery</title>
</svelte:head>

<div>
{#each images as image}
    <Thumbnail {...image} />
{/each}
</div>

<style>
    div {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }
</style>

<script context="module">
    export async function preload(page, session) {
        const res = await this.fetch('gallery.json');
        const images = await res.json();
        return { images }
    }
</script>

<script>
    import Thumbnail from '../../components/Thumbnail.svelte';
    import Lightbox from '../../components/Lightbox.svelte';
    export let images;
    let selected;
</script>

<svelte:head>
	<title>Gallery</title>
</svelte:head>

<div>
    {#if selected}
        <Lightbox {...selected} on:closeLightbox={() => selected = undefined} />
    {/if}
    {#each images as image}
        <Thumbnail {...image} clickHandler={img => selected = img}/>
    {/each}
</div>

<style>
    div {
        cursor: pointer;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }
</style>

<svelte:head>
	<title>Gallery</title>
</svelte:head>

<div>
    {#if !images || !images.length}
        <h5>I thought I had more images than this...</h5>
    {:else}
        {#each images as image, index}
            <Thumbnail {...image} on:click={img => selectedIdx = index}/>
        {/each}
    {/if}
</div>

<script context="module">
    export async function preload(page, session) {
        const res = await this.fetch('gallery.json');
        if(res.status === 200) {
            const images = await res.json();
            return { images }
        }
        this.error(404, "Not Found");
    }
</script>

<script>
    import Thumbnail from '../../components/Thumbnail.svelte';
    export let images = [];
    
    let selectedIdx;
    $: selectedImage = images[selectedIdx]


</script>

<style>
    div {
       display: grid;
       grid-template-columns: repeat(auto-fit, minmax(140px, max-content));
       grid-gap: 16px;
       justify-content: center;
       padding: initial;
    }
    @media (min-width: 580px) {
        div {
            grid-template-columns: repeat(auto-fit, minmax(250px, max-content));
        }
    }
</style>

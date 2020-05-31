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

    function close() {
        selectedIdx = undefined;
    }

    function onKeydown(e) {
        const last = images.length - 1 

        switch(e.which) {
            case 27: 
                close();
                break;
            case 37:
                selectedIdx = selectedIdx === 0 
                    ? last
                    : selectedIdx - 1;
                break;
            case 39:
                selectedIdx = selectedIdx === last
                    ? 0
                    : selectedIdx + 1;
        }
    }

</script>

<style>
    div {
        cursor: pointer;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }
</style>

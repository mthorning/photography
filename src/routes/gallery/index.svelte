<svelte:head>
	<title>Gallery</title>
</svelte:head>

<div>
    {#if selectedIdx !== undefined}
        <Lightbox {...selectedImage} on:click={close} on:keydown={onKeydown} />
    {/if}
    {#each images as image, index}
        <Thumbnail {...image} on:click={img => selectedIdx = index}/>
    {/each}
</div>

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

<svelte:head>
    <title>{image.fileName}</title>
</svelte:head>

<script context="module">
    export async function preload(page, session) {
        const { fileName } = page.params;
        const res = await this.fetch(`gallery/${fileName}.json`);
        const image = await res.json();
        return { image }
    }
</script>

<script>
    import  { goto } from '@sapper/app';
    import Lightbox from '../../components/Lightbox.svelte';
    export let image;
</script>

<Lightbox {...image} on:click={() => goto('/gallery')} />


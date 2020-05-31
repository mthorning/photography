<svelte:head>
    <title>{image.fileName}</title>
</svelte:head>

<script context="module">
    export async function preload(page, session) {
        const { fileName } = page.params;
        const res = await this.fetch(`gallery/${fileName}.json`);
        if(res.status === 200) {
            const image = await res.json();
            return { image }
        }

        this.error(404, "Not Found");
    }
</script>

<script>
    import { onMount } from 'svelte';
    import  { goto } from '@sapper/app';
    import Lightbox from '../../components/Lightbox.svelte';
    export let image;

    onMount(() => {
        document.addEventListener('keydown', onKeydown);
        return () => 
            document.removeEventListener('keydown', onKeydown);
    });

    function go(page = '') {
        console.log(page);
        goto(`/gallery/${page}`);
    }

    function onKeydown(e) {
        switch(e.which) {
            case 27: 
                go();
                break;
            case 37:
                go(image.next)
                break;
            case 39:
                go(image.previous)
                break;
        }
    }
</script>

<Lightbox 
    {...image} 
    on:keydown={onKeydown} 
    on:click={() => go()} 
    on:swipeleft={() => go(image.previous)}
    on:swiperight={() => go(image.next)}
/>


<!-- svelte-ignore a11y-autofocus -->
<div on:click on:touchstart={onTouchstart} on:touchend={onTouchend}>
    <span>
        <img 
           on:click={() => showLightbox = true}
           alt={fileName} 
           class:isPortrait 
           src={`images/fullsize/${fileName}.${type}`} 
         />
         <p>f{apperture} | {shutter}sec | ISO {iso} | {focalLength}mm </p>
    </span>
</div>
{#if showLightbox}
    <Lightbox {...{ fileName, type, isPortrait, close: () => showLightbox = false }} />
{/if}

<script>
    import { createEventDispatcher } from 'svelte';
    import Lightbox from './Lightbox.svelte';

    export let meta, isPortrait, fileName, type;
    $: apperture = meta.apperture;
    $: focalLength = meta.focalLength;
    $: iso = meta.iso;
    $: shutter = meta.shutter >= 1 
        ? Math.round(meta.shutter*10)/10
        : `1/${Math.round(1/meta.shutter)}`

    const dispatch = createEventDispatcher();
    let touchstart = 0;
    let showLightbox = false;
    

    function onTouchstart({ changedTouches }) {
        touchstart = changedTouches[0].screenX;
    };

    function onTouchend({ changedTouches }) {
        const touchend = changedTouches[0].screenX;
        if (touchend < touchstart) {
            dispatch('swipeleft');
        }
        if (touchend > touchstart) {
            dispatch('swiperight');
        }
    }

</script>

<style>
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    p {
        margin: 0;
        text-align: right;
    }
    img {
        cursor: pointer;
        max-width: 100%;
        max-height: 50vh;
        background: transparent url('https://lunawood.com/wp-content/uploads/2018/02/placeholder-image.png') center no-repeat;
        background-size: 30%;
    }

</style>

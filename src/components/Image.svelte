<!-- svelte-ignore a11y-autofocus -->
<div on:click on:touchstart={onTouchstart} on:touchend={onTouchend}>
    <span>
        <h2>{fileName.replace(/_/g, ' ')}</h2>
        <img 
           alt={fileName} 
           class:isPortrait 
           src={`images/fullsize/${fileName}.${type}`} 
         />
         <p>f{apperture} | {shutter}sec | ISO {iso} | {focalLength}mm </p>
    </span>
</div>

<script>
    import { createEventDispatcher } from 'svelte';
    export let meta, isPortrait, fileName, type;
    $: apperture = meta.apperture;
    $: focalLength = meta.focalLength;
    $: iso = meta.iso;
    $: shutter = meta.shutter >= 1 
        ? Math.round(meta.shutter*10)/10
        : `1/${Math.round(1/meta.shutter)}`

    const dispatch = createEventDispatcher();
    let touchstart = 0;
    

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
        /* object-fit: contain; */
        max-width: 100%;
        max-height: calc(100vh - 200px);
        background: transparent url('https://lunawood.com/wp-content/uploads/2018/02/placeholder-image.png') center no-repeat;
        background-size: 30%;
    }

</style>

<!-- svelte-ignore a11y-autofocus -->
<div on:click on:touchstart={onTouchstart} on:touchend={onTouchend}>
    <img 
       alt={fileName} 
       class:isPortrait 
       src={`images/fullsize/${fileName}.${type}`} 
    />
</div>

<script>
    import { createEventDispatcher } from 'svelte';
    export let isPortrait, fileName, type;
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
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 100;
        padding: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    img {
        object-fit: contain;
        width: 100%;
        height: 100%;
        max-width: 1920px;
        background: transparent url('https://lunawood.com/wp-content/uploads/2018/02/placeholder-image.png') center no-repeat;
    }

</style>

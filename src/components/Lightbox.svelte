<!-- svelte-ignore a11y-autofocus -->
<div on:click={() => close()} on:touchstart={onTouchstart} on:touchend={onTouchend}>
    <img 
        on:click={onImageClick}
        alt={fileName} 
        class:isPortrait 
        src={`images/fullsize/${fileName}.${type}`} 
        transition:fade|local={{ duration: 300, easing: quadIn, start: 0.7 }}
    />
</div>

<script>
    import { createEventDispatcher } from 'svelte';
    import { onMount } from 'svelte';
    import { goto } from '@sapper/app';
    import { fade } from 'svelte/transition';
    import { quadIn, quadOut } from 'svelte/easing';

    export let fileName, type, isPortrait, close;
    export let previous = () => {};
    export let next = () => {};
    let touchstart = 0;
    
    onMount(() => {
        document.addEventListener('keydown', onKeydown);
        return () => 
            document.removeEventListener('keydown', onKeydown);
    });

    function onImageClick(e) {
        goto(`/image/${fileName}`);
    }
    function onTouchstart({ changedTouches }) {
        touchstart = changedTouches[0].screenX;
    };
    function onTouchend({ changedTouches }) {
        const touchend = changedTouches[0].screenX;
        if (touchend + 100 < touchstart) {
            next();
        }
        if (touchend - 100 > touchstart) {
            previous();
        }
    }
    function onKeydown(e) {
        switch(e.which) {
            case 27: 
                close();
                break;
            case 37:
                previous();
                break;
            case 39:
                next()
                break;
        }
    }
</script>

<style>
    div {
        background: rgba(0, 0, 0, 0.9);
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 100;
        display: flex;
        padding: 16px;
        align-items: center;
        justify-content: center;
    }
    img {
        cursor: pointer;
        max-width: 100%;
        max-height: 100%;
        background: transparent url('https://lunawood.com/wp-content/uploads/2018/02/placeholder-image.png') center no-repeat;
        background-size: 30%;
    }
</style>

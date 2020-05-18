<script>
    import { createEventDispatcher } from 'svelte';
    export let fileName, extension, isPortrait;

    const dispatch = createEventDispatcher();
    function close() {
        dispatch('closeLightbox')
    }

</script>

<div on:click={close}>
    <img class:isPortrait src={`images/fullsize/${fileName}${extension}`} />
</div>

<style>
    div {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 100;
        background: rgba(0, 0, 0, 0.95);
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
    }

</style>

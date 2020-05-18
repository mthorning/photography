<script context="module">
    export async function preload(page, session) {
        const { imageName } = page.params;
        const res = await this.fetch(`gallery/${imageName}.json`);
        const image = await res.json();
        return { image }
    }
</script>

<script>
    export let image;
</script>

<svelte:head>
    <title>{image.name}</title>
</svelte:head>

<img src={image.path} />

<style>
    img {

    }
</style>

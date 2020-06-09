<svelte:head>
    <title>{image.fileName}</title>
</svelte:head>

<div>
    <h1>{image.fileName.replace(/_/g, ' ')}</h1>
    <Image {...image} />
    {#if image.meta && image.meta.description}
        <p>{image.meta.description}<p>
    {/if}
    <footer>
        <a href={`/image/${image.previous}`}>previous</a>
        <a href={`/image/${image.next}`}>next</a>
    </footer>
</div>

<script context="module">
    export async function preload(page, session) {
        const { fileName } = page.params;
        const res = await this.fetch(`image/${fileName}.json`);
        if(res.status === 200) {
            const image = await res.json();
            return { image }
        }

        this.error(404, "Not Found");
    }
</script>

<script>
    import  { goto } from '@sapper/app';
    import Image from '../../components/Image.svelte';
    export let image;

</script>

<style>
    div {
        background: #19191c;
        margin: 0 -32px -32px -32px;
        padding: 32px;
    }
    h1 {
        margin-bottom: 20px;
        border-bottom: 1px solid #777;
        padding: 0 20px 20px 20px;
        margin-bottom: 60px;
    }
    footer {
        display: flex;
        justify-content: space-between;
        font-weight: 300;
        margin-top: 60px;
        padding: 20px 20px 0 20px;
        border-top: 1px solid #777;
    }
    p {
        margin-top: 50px;
    }
    a {
        text-decoration: none;
    }
</style>

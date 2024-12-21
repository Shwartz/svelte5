<script>
    import Content from "$lib/blog/logic/Content.svelte";
    export let data;
    const {slug} = data;
</script>

<Content {slug}/>


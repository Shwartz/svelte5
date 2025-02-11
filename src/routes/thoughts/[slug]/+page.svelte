<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { tagState } from '$lib/stores/tagState.svelte';

	export let data: PageData;
	const { slug, postData: { id, Visual, readingTime, tags, title } } = data;
	let PostContent: any;

	onMount(() => {
		tagState.id = id;
		tagState.tagArr = tags;
		tagState.title = title;
		tagState.Visual = Visual;
		loadContent();
	});

	async function loadContent() {
		try {
			const content = await import(`$lib/blog/posts/${slug}.svelte`);
			PostContent = content.default;
		} catch (error) {
			console.error(`Failed to load post for slug: ${slug}`, error);
			// TODO: implement 404 page
		}
	}
</script>
<!-- All this is added to children() prop in the +layout.svelte -->
{#if id}
	<p>ID: {id}</p>
	<p>Reading Time: {readingTime}</p>
	<p>{tags}</p>
{/if}
{#if PostContent}
	<div class="content-wrapper" style={Visual ? 'padding-top: 0' : ''}>
		<svelte:component this={PostContent} />
	</div>
{:else}
	<p>Loading post content...</p>
{/if}

<style lang="scss">
  p {
    color: red;
  }
</style>

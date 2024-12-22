<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { slug } = data;

	let Component: any;

	onMount(async () => {
		try {
			const module = await import(`$lib/blog/${slug}.svelte`);
			Component = module.default;
		} catch (error) {
			console.error(`Failed to load component for slug: ${slug}`, error);
			// TODO: implement 404 page
		}
	});
</script>

{#if Component}
	<svelte:component this={Component} />
{:else}
	<!-- loading state -->
	<p>Loading...</p>
{/if}

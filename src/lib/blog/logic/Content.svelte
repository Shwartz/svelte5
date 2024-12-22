<script lang="ts">
	import SvelteVsReactjs from '$lib/blog/svelte-vs-reactjs.svelte';

	export let slug: string;
	console.log({slug}); //slug: svelte-vs-reactjs
	const UrlComponentMap = {
		['svelte-vs-reactjs']: SvelteVsReactjs
	}

	const Component = UrlComponentMap[slug];
</script>

<Component />

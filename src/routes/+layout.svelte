<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.data.title ?? 'global title'} | end</title>
</svelte:head>

<nav>
	<a href="/">Home</a>
	<a href="/blog">About</a>
</nav>

<slot />

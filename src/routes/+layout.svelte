<script lang="ts">
	import { page } from '$app/stores';
	import '../app.scss';
</script>

<svelte:head>
	<title>{$page.data.title ?? 'global title'} | end</title>
</svelte:head>
<div class="page">
	<nav>
		<a href="/">Home</a>
		<a href="/blog">About</a>
	</nav>

	<slot />

</div>

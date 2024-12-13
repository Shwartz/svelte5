<script lang="ts">
	import { page } from '$app/stores';
	import '../app.scss';
</script>

<svelte:head>
	<title>{$page.data.title ?? 'global title'} | end</title>
</svelte:head>
<div class="page">
	<nav>
		<a href="/">Andris Švarcs</a>
		<a href="/blog">Blog</a>
		<a href="/news-archive">News archive</a>
	</nav>

	<slot />

</div>

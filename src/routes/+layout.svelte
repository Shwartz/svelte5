<script lang="ts">
	import { page } from '$app/stores';
	import '../app.scss';
</script>

<svelte:head>
	<title>{$page.data.title ?? 'fallback title'}</title>
</svelte:head>

<div class="page">
	<div class="container">
		<header>
			<nav>
				<a href="/">Andris Švarcs</a>
				<a href="/blog">Blog</a>
				<a href="/news-archive">News archive</a>
			</nav>
			<div>[i][c][o][n][s]</div>
		</header>
		<slot />
	</div>
</div>

<style lang="scss">

  header {
    display: flex;
  }
</style>

<script lang="ts">
	export const prerender = true
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import '../app.scss';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
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
			<div>
				[i][c][o][n][s]
			</div>
		</header>
		<slot />
	</div>
</div>

<style lang="scss">
  header {
    display: flex;
  }
</style>

<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
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
		<div class="grid">
			<header>
				<nav>
					<a href="{base}/">Andris Švarcs</a>
					<a href="{base}/thoughts">Blog</a>
					<a href="{base}/news-archive">News archive</a>
				</nav>
				<div>
					[i][c][o][n][s]
				</div>
			</header>
			<div>
				<slot />
			</div>
			<footer>
				<div>One</div>
				<div>Two</div>
				<div>Three</div>
			</footer>
		</div>
	</div>
</div>

<style lang="scss">
  header {
    display: flex;
  }

	footer {
		margin-top: auto;
	}
</style>

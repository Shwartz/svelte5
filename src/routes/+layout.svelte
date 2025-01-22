<script lang="ts">
	import { browser } from '$app/environment';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { TrOutlineAdjustments } from 'svelte-icons-pack/tr';
	import { Icon } from 'svelte-icons-pack';
	import '../app.scss';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';

	const GRID_STATE = 'gridState';
	let initialGridState = true;
	if (browser && localStorage.getItem(GRID_STATE) !== null) {
		initialGridState = JSON.parse(localStorage.getItem(GRID_STATE) ?? 'false');
	}

	let isGridOn = $state(initialGridState);

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	const toggleGrid = () => {
		isGridOn = !isGridOn;
		localStorage.setItem(GRID_STATE, JSON.stringify(isGridOn));
	};
</script>

<svelte:head>
	<title>{$page.data.title ?? 'fallback title'}</title>
</svelte:head>

<div class="page">
	<div class="container">
		<div class={`grid ${isGridOn ? '' : 'gridOff'}`}>
			<header>
				<a href="{base}/" class="me">Andris Švarcs</a>
				<nav>
					<a href="{base}/thoughts">blog</a>
					<a href="{base}/news-archive">news archive</a>
					<a href="{base}/good-read">good read</a>
				</nav>
				<div class="settings">
					<button type="button" class={`clean ${isGridOn ? 'on' : ''}`} onclick={toggleGrid}>
						<Icon size="20" color="var(--text)" src={TrOutlineAdjustments} />
					</button>
					<ThemeSwitcher />
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
    justify-content: space-between;

    a {
      color: var(--text);
      text-decoration: none;

      &:hover,
      &:focus {
        text-decoration: underline;
      }
    }

    .me {
      font-weight: bold;
    }
  }

  nav {
    display: flex;
    gap: 2rem;
  }

  .settings {
    display: flex;
    gap: 1rem;

    button {
      width: 24px;
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;

      &.on {
        border: 1px solid var(--text);
      }
    }
  }

  footer {
    margin-top: auto;
  }

  .gridOff {
    background-image: none;

    &:after {
      display: none;
    }
  }
</style>

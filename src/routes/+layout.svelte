<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import {TrOutlineAdjustments, TrOutlineSun, TrOutlineMoonStars} from 'svelte-icons-pack/tr';
	import { Icon } from 'svelte-icons-pack';
	import '../app.scss';

	let isGridOn = $state(true);

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
	}
</script>

<svelte:head>
	<title>{$page.data.title ?? 'fallback title'}</title>
</svelte:head>

<div class="page">
	<div class="container">
		<div class={`grid ${isGridOn ? 'gridOff' : ''}`}>
			<header>
				<a href="{base}/" class="me">Andris Švarcs</a>
				<nav>
					<a href="{base}/thoughts">blog</a>
					<a href="{base}/news-archive">news archive</a>
					<a href="{base}/good-read">good read</a>
				</nav>
				<div class="settings">
					<button type="button" class={`clean ${!isGridOn ? 'on' : ''}`} onclick={toggleGrid}>
						<Icon size="16" color="var(--black)" src={TrOutlineAdjustments} />
					</button>
					<button type="button" class="clean">
						<Icon size="16" color="var(--black)" src={TrOutlineSun} />
						<Icon className="moon" size="16" color="var(--black)" src={TrOutlineMoonStars} />
					</button>
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
			color: var(--black);
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
				border: 1px solid var(--black);
			}
		}
	}

	:global(.moon) {
		display: none;
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

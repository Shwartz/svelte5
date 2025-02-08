<script lang="ts">
	import { browser } from '$app/environment';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { TrOutlineGrid3x3, TrOutlineMenu2, TrOutlineX } from 'svelte-icons-pack/tr';
	import { Icon } from 'svelte-icons-pack';
	import '../app.scss';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import '@fontsource-variable/inter';
	import '@fontsource/frank-ruhl-libre/700.css';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { debounce } from '$lib/utils/debounce';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();

	const GRID_STATE = 'gridState';
	let initialGridState = true;
	if (browser && localStorage.getItem(GRID_STATE) !== null) {
		initialGridState = JSON.parse(localStorage.getItem(GRID_STATE) ?? 'false');
	}

	let isGridOn = $state(initialGridState);
	let isHamburgerOn = $state(false);
	let isAnimated = $state(false);
	let windowWidth = $state(0);
	let isDesktop = $state(false);
	let isTabbingAvailable = $derived(isDesktop ? true : isHamburgerOn);

	const menuId = 'main-nav-menu';

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

	const toggleHamburger = () => {
		if (!isAnimated) {
			isAnimated = !isAnimated; // invoke once
		}
		isHamburgerOn = !isHamburgerOn;
	};

	afterNavigate(() => {
		isHamburgerOn = false;
	});

	$effect(() => {
		if (isHamburgerOn) {
			const menu = document.getElementById(menuId);
			menu?.focus();
		}
	});

	$effect(() => {
		isDesktop = windowWidth >= 768;
		// Update your menu state or other UI elements based on isDesktop
	});

	onMount(() => {
		windowWidth = window.innerWidth;

		const handleResize = debounce(() => {
			windowWidth = window.innerWidth;
		}, 250);

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});

	onMount(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (!target.closest('#topHead')) {
				isHamburgerOn = false;
			}
		};
		const handleKeydown = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isHamburgerOn) {
				isHamburgerOn = false;
			}
		};
		document.addEventListener('click', handleClickOutside);
		document.addEventListener('keydown', handleKeydown);

		return () => {
			document.removeEventListener('click', handleClickOutside);
			document.addEventListener('keydown', handleKeydown);
		};
	});
</script>

<svelte:head>
	<title>{$page.data.title ?? 'fallback title'}</title>
</svelte:head>

<div class="page">
	<div class="container">
		<div class={`grid ${isGridOn ? '' : 'gridOff'}`}>
			<header id="topHead" class={isHamburgerOn ? 'slideMenuIn' : ''}>
				<a href="{base}/" class="me">Andris Švarcs</a>
				<div class="hamburger">
					<button
						onclick={toggleHamburger}
						type="button"
						class="clean"
						aria-expanded={isHamburgerOn}
						aria-controls={menuId}
						aria-label={isHamburgerOn ? "Close menu" : "Open menu"}
					>
						{#if isHamburgerOn}
							<Icon size="16" color="var(--text)" src={TrOutlineX} />
						{:else}
							<Icon size="16" color="var(--text)" src={TrOutlineMenu2} />
						{/if}
					</button>
				</div>

				<div class="menu" class:isAnimated>
					<nav
						id={menuId}
						aria-label="Main menu"
						class={isHamburgerOn ? 'slideMenuIn' : ''}
						aria-hidden={!isHamburgerOn}
					>
						<a
							href="{base}/thoughts"
							tabindex={isTabbingAvailable ? 0 : -1}
							aria-current={$page.url.pathname === '/thoughts' ? 'page' : undefined}
						>blog</a>
						<a
							href="{base}/news-archive"
							tabindex={isTabbingAvailable ? 0 : -1}
							aria-current={$page.url.pathname === '/news-archive' ? 'page' : undefined}
						>news archive</a>
						<a
							href="{base}/good-read"
							tabindex={isTabbingAvailable ? 0 : -1}
							aria-current={$page.url.pathname === '/good-read' ? 'page' : undefined}
						>good read</a>
					</nav>

					<div class="settings">
						<button
							type="button"
							class={`clean ${isGridOn ? 'on' : ''}`}
							onclick={toggleGrid}
							tabindex={isTabbingAvailable ? 0 : -1}
						>
						<span>
							<Icon size="14" color="var(--text)" src={TrOutlineGrid3x3} />
						</span>
						</button>
						<ThemeSwitcher isMenuOpen={isTabbingAvailable} />
					</div>
				</div>

			</header>
			<div>
				{@render children()}
			</div>
			<Footer />
		</div>
	</div>
</div>

<style lang="scss">
  :global(body) {
    font-family: "Inter Variable", sans-serif;
  }

  :global(.frankTitle) {
    font-family: "Frank Ruhl Libre", serif;
  }

  /* HEADER MENU */
  header {
    display: grid;
    align-items: center;
    grid-template-areas:
		"a c"
		"b b";

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

  .me {
    grid-area: a;
  }

  .menu {
    grid-area: b;
  }

  .hamburger {
    grid-area: c;
    justify-self: right;
    align-self: center;
  }

  /* HEADER MENU: MOBILE*/
  header {
    --navTop: 56px;
    position: relative;

    .menu {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
			padding: 0 0 0 1rem;
      transform: translate3d(110%, var(--navTop), 0);
      transition: none;
      background: var(--background-color);
			box-shadow: 0 0 1px 0 var(--text);
      visibility: hidden;

      &.isAnimated {
        visibility: visible;
      }
    }

    &.slideMenuIn .menu {
      animation: slideInWithBounce 0.5s forwards;
    }

    &:not(.slideMenuIn) .menu {
      animation: slideOutWithBounce 0.5s forwards;
    }
  }

  nav {
    display: flex;
    flex-direction: column;

    a {
      display: block;
      padding: 0.4rem 0;
    }
  }

  .settings {
    display: flex;

    button {
      width: 44px;
      height: 44px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      cursor: pointer;
      overflow: hidden;

      span {
        display: flex;
        padding: 2px;
        width: 20px;
        height: 20px;
        border-radius: 4px;
        border: 1px solid var(--text);
        will-change: transform;
      }

      :global(svg) {
        display: none;
      }

      &.on :global(svg) {
        display: block;
      }

      > * {
        transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
      }

      &:hover > * {
        transform: scale(1.2);
      }
    }
  }

  .hamburger {
    button {
      width: 44px;
      height: 44px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      cursor: pointer;
      overflow: hidden;
    }
  }

  /* HEADER MENU: > 500 | 31.25rem */
  @media(min-width: 31.25rem) {
    .menu {
      --navTop: 24px;
    }

    nav {
      flex-direction: row;
      gap: 2rem;
    }
  }

  /* HEADER MENU: Full Size > 768 | 48rem */
  @media(min-width: 48rem) {
    header {
      grid-template-areas:
		"a b";

      .menu {
        --navTop: 24px;
        position: relative;
				padding: 0;
        visibility: visible;
        transform: none;
        background: none;
        animation: none;
				box-shadow: none;
      }

      &.slideMenuIn .menu {
        animation: none;
      }

      &:not(.slideMenuIn) .menu {
        animation: none;
      }
    }

    nav {
      flex-direction: row;
      gap: 2rem;
    }

    .hamburger {
      display: none;
    }
  }

  /* Prevent hidden menu from receiving focus */
  /*nav[aria-hidden="true"] {
    visibility: hidden;
    opacity: 0;
  }*/

  nav[aria-hidden="false"] {
    visibility: visible;
    opacity: 1;
  }

  .gridOff {
    background-image: none;

    &:after {
      display: none;
    }
  }

  @keyframes slideInWithBounce {
    0% {
      transform: translate3d(-110%, var(--navTop), 0);
    }
    60% {
      transform: translate3d(4%, var(--navTop), 0);
    }
    80% {
      transform: translate3d(-2%, var(--navTop), 0);
    }
    100% {
      transform: translate3d(0, var(--navTop), 0);
    }
  }

  @keyframes slideOutWithBounce {
    0% {
      transform: translate3d(0, var(--navTop), 0);
    }
    20% {
      transform: translate3d(4%, var(--navTop), 0);
    }
    40% {
      transform: translate3d(-2%, var(--navTop), 0);
    }
    100% {
      transform: translate3d(-110%, var(--navTop), 0);
    }
  }
</style>

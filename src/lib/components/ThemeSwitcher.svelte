<script lang="ts">
	import { browser } from '$app/environment';
	import { TrOutlineMoonStars, TrOutlineSun } from 'svelte-icons-pack/tr';
	import { Icon } from 'svelte-icons-pack';
	import { theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';

	const getPreferredColorScheme = () => {
		if (browser) {
			return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		}
		return 'light';
	};

	const getInitialTheme = () => {
		if (browser) {
			const storedTheme = localStorage.getItem('theme');
			if (storedTheme) {
				return storedTheme as 'dark' | 'light';
			}
			return getPreferredColorScheme();
		}
		return 'light';
	};

	const toggleTheme = () => {
		theme.update(currentTheme => {
			const newTheme = currentTheme === 'light' ? 'dark' : 'light'
			if (browser) {
				localStorage.setItem('theme', newTheme);
			}
			return newTheme;
		});
	}

	onMount(() => {
		theme.set(getInitialTheme());

		if (browser) {
			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
			const handleChange = () => {
				if (!localStorage.getItem('theme')) {
					theme.set(getPreferredColorScheme());
				}
			};

			mediaQuery.addEventListener('change', handleChange);

			return () => {
				mediaQuery.removeEventListener('change', handleChange);
			};
		}
	});

	$effect(() => {
		if (browser) {
			theme.subscribe(currentTheme => {
				document.documentElement.setAttribute('data-theme', currentTheme);
			});
		}
	});
</script>

<button type="button" class="clean" onclick={toggleTheme}>
	<Icon className="sun" size="20" color="var(--black)" src={TrOutlineSun} />
	<Icon className="moon" size="20" color="var(--black)" src={TrOutlineMoonStars} />
</button>

<style lang="scss">
  :global(html[data-theme='light'] .moon) {
    display: none;
  }

  :global(html[data-theme='dark'] .sun) {
    display: none;
  }
</style>

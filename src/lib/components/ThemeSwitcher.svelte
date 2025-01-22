<script>
	import { browser } from '$app/environment';
	import { TrOutlineMoonStars, TrOutlineSun } from 'svelte-icons-pack/tr';
	import { Icon } from 'svelte-icons-pack';
	import { theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';

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
		return theme.subscribe(value => {
			if (typeof document !== 'undefined') {
				document.documentElement.setAttribute('data-theme', value);
				/*if (browser) {
					localStorage.setItem('theme', value);
				}*/
			}
		});
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

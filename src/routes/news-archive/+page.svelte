<script lang="ts">
	// src/routes/news-archive/+page.svelte
	import Header from '$lib/components/Header.svelte';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import ToggleListGrid from '$lib/components/ToggleListGrid.svelte';
	import { onMount } from 'svelte';

	const { news } = $page.data;
	const newsCount = news.posts.length;
	let checked = $state(false);
	let compact = $state(false);

	console.log({ news });

	onMount(() => {
		const savedState = localStorage.getItem('themeNewsListGrid');
		checked = savedState === 'true';
		compact = checked;
		localStorage.setItem('themeNewsListGrid', checked.toString());
	})

	function toggleCompact() {
		checked = !checked;
		localStorage.setItem('themeNewsListGrid', checked.toString());
		toggleView();
	}

	function toggleView() {
		/* Fallback if no support for transition and can do something else */
		if (!document.startViewTransition) {
			compact = checked;
			return;
		}

		document.startViewTransition(() => {
			compact = checked; // this is how I can trigger transition
		});
	}
</script>

<div class="news">
	<Header />
	<h1 class="frankTitle">news</h1>
	<p class="intro">To stay with the latest trends in the Front-end world, I skim the web, <a
		href="https://bsky.app/profile/andrissvarcs.bsky.social">BlueSky</a> and several
		newsletters during the week.
		Naturally, as a active <a href="https://www.notion.com/">Notion</a> user, I jot down whatever interests me. I found
		it handy more than once to search for THAT
		specific article(s) about a particular feature.<br />
		Now, I'm transferring my archive to the web using <a href="https://svelte.dev/">SvelteKit</a> and Notion's API.</p>

	<div class="headerTags">
			<div>{newsCount} items</div>
			<div>
				<ToggleListGrid {checked} toggleCompact={toggleCompact} />
			</div>
	</div>
	<p style="color: darkred">{checked}</p>
	<ul class={checked ? `list` : `grid`}>
		{#each news.posts as post}
			<li>
				<h5><a href='{base}/news-archive/{post.slug}'>{post.title}</a></h5>
				<div>{post.summary}</div>
			</li>
		{/each}
	</ul>

</div>

<!-- svelte-ignore css_unused_selector -->
<style lang="scss">
  .news {
    flex-grow: 1;
  }

  .frankTitle {
    font-size: 9rem;
    color: var(--textLight);
    line-height: normal;
  }

  .intro {
    width: 100%;
  }

  @media (min-width: 600px) {
    .intro {
      width: 75%;
    }
  }

  @media (min-width: 1200px) {
    .intro {
      width: 50%;
    }
  }

	.headerTags {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: space-between;
    padding: 4rem 0 1.5rem;
    border-bottom: 1px dotted var(--grid-color);
	}
</style>

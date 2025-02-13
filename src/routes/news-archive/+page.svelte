<script lang="ts">
	// src/routes/news-archive/+page.svelte
	import Header from '$lib/components/Header.svelte';
	import { page } from '$app/stores';
	import { base } from '$app/paths';

	const { news } = $page.data;
	const newsCount = news.posts.length;

	console.log({ news });
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



	<ul>
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
</style>

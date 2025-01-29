<script lang="ts">
	import PostList from '$lib/blog/logic/PostList.svelte';
	import { onMount } from 'svelte';
	import type { CategoryType } from '$lib/utils/categoryColors';

	let compact = $state(false);
	let checked = $state(false);
	let selectedFilter = $state<CategoryType | null>(null);

	onMount(() => {
		const savedState = localStorage.getItem('themeCompactState');
		checked = savedState === 'true';
		compact = checked;
	});
</script>

<section class="hero">
	<p>A product-minded deep dive into design, accessibility and SEO topics</p>
</section>
<section class="blog">
	<div class="title">
		<h3>Blog</h3>
		<a href="/thoughts">Read all</a>
	</div>
	<div class="latestPosts">
		<PostList {compact} {selectedFilter} numberOfPosts={3} />
	</div>
</section>

<style lang="scss">
  .hero {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
  }

  .hero p {
    font-size: px-to-rem(40px);
    line-height: px-to-rem(56px);
    max-width: 960px;
    text-align: center;
    padding: 1rem;
  }
</style>

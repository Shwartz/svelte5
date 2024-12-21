<script lang="ts">
	import { postsArr } from '$lib/blog/logic/postsConfig';

	// This is how I get props in child <PostList {selectedFilter />
	export let selectedFilter: string | null = null;

	$: filteredPosts = selectedFilter
		? postsArr.filter(post => post.tags.includes(selectedFilter))
		: postsArr;
</script>

{#each filteredPosts as post}
	<section>
		<a href={post.url}>{post.title}</a>
		<p>{post.description}</p>
	</section>
{/each}

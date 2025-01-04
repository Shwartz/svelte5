<!-- +page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import ToggleCompact from '$lib/components/ToggleCompact.svelte';
	import Tag, { type cats } from '$lib/components/snippets/Tag.svelte';
	import PostList from '$lib/blog/logic/PostList.svelte';
	import { postsArr } from '$lib/blog/logic/postsConfig';

	let compact = $state(false);
	let checked = $state(false);
	let selectedFilter = $state<cats | null>(null);
	let postCount = $state(postsArr.length);

	// Get unique tags from all posts and asset them as cats type
	const allTags = [...new Set(postsArr.flatMap(post => post.tags))] as cats[];

	function handleFilterClick(tag: cats) {
		selectedFilter = selectedFilter === tag ? null : tag;
	}

	onMount(() => {
		const checkbox = document.getElementById('toggleCompact') as HTMLInputElement;
		checkbox.addEventListener('change', toggleView);
		const savedState = localStorage.getItem('themeCompactState');
		compact = savedState === 'true';
	});

	function handlePostCountChange(count: number) {
		postCount = count;
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

<h1>Blog</h1>
<div class="headerTags">
	<div>{postCount} {postCount === 1 ? 'item' : 'items'}</div>
	<div class="filter">
		{#each allTags as tag}
			<button
				onclick={() => handleFilterClick(tag)}
				class="btnTag"
			>
				<Tag active={selectedFilter === tag} blogCategory={tag} />
			</button>
		{/each}
	</div>
	<ToggleCompact bind:checked />
</div>

<PostList {compact} {selectedFilter} onCountChange={handlePostCountChange} />

<style lang="scss">
  .headerTags {
    display: flex;
    justify-content: space-between;
  }

  .btnTag {
    border: none;
    background: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
  }

  .filter {
    display: flex;
    gap: 4px;
  }
</style>


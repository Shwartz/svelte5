<script lang="ts">
	import { onMount } from 'svelte';
	import ToggleCompact from '$lib/components/ToggleCompact.svelte';
	import Tag, {type cats} from '$lib/components/snippets/Tag.svelte';
	import PostList from '$lib/blog/logic/PostList.svelte';
	import { postsArr } from '$lib/blog/logic/postsConfig';

	/**
	 * Icons for the website
	 * https://leshak.github.io/svelte-icons-pack/#/pack/tr
	 * */

	let compact: boolean = false;
	/** Magically comes from ToggleCompact.svelte as I bind it in Component and export from there */
	let checked: boolean;

	// Get unique tags from all posts and asset them as cats type
	const allTags = [...new Set(postsArr.flatMap(post => post.tags))] as cats[];
	let selectedFilter: cats | null = null;
	function handleFilterClick(tag: cats) {
		selectedFilter = selectedFilter === tag ? null : tag;
	}

	onMount(() => {
		const checkbox = document.getElementById('toggleCompact') as HTMLInputElement;
		checkbox.addEventListener('change', toggleView);
		const savedState = localStorage.getItem('themeCompactState');
		compact = savedState === 'true';
	});

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
	<div class="filter">
		{#each allTags as tag}
			<button
				on:click={() => handleFilterClick(tag)}
				class="btnTag"
			>
				<Tag active={selectedFilter === tag} blogCategory={tag} />
			</button>
		{/each}
	</div>
	<ToggleCompact bind:checked />
</div>

<PostList {compact} {selectedFilter} />

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


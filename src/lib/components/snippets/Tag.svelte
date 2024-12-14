<script lang="ts">
	const predefinedCategories = {
		JavaScript: 'var(--pastel-green)',
		CSS: 'var(--pastel-orange)',
		Tools: 'var(--pastel-yellow)',
		Design: 'var(--pastel-violet)',
		Random: 'var(--pastel-red)',
	};

	type cats = keyof typeof predefinedCategories;

	export let blogCategory: cats = 'JavaScript';
</script>

<span class="tag" style:background-color={predefinedCategories[blogCategory]}>
  <slot>{blogCategory}</slot>
</span>

<style>
    .tag {
        display: inline-block;
        padding: 0.25em 0.7em;
        border-radius: 1em;
        color: black;
        font-size: 0.75rem;
    }
</style>

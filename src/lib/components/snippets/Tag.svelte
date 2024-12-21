<script lang="ts" context="module">
	export const predefinedCategories = {
		JavaScript: 'var(--pastel-green)',
		CSS: 'var(--pastel-orange)',
		Tools: 'var(--pastel-yellow)',
		Design: 'var(--pastel-violet)',
		Random: 'var(--pastel-red)',
	} as const;

	export type cats = keyof typeof predefinedCategories;
</script>

<script lang="ts">
  export let blogCategory: cats = 'JavaScript';
  export let active:boolean;
</script>

<span class="tag" class:active style:background-color={predefinedCategories[blogCategory]}>
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

    .active {
      outline: 1px solid red;
    }
</style>

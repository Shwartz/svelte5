<script lang="ts">
  import {type CategoryType, getCategoryColor} from '$lib/utils/categoryColors';

  export let blogCategory: CategoryType = 'JavaScript';
	export let active: boolean = false;
</script>

<span class="tag" class:active={active} style:background-color={getCategoryColor(blogCategory)}>
  {blogCategory}
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
        box-shadow: 1px 1px 3px black inset;
    }
</style>

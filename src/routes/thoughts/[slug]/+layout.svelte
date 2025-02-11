<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { tagState } from '$lib/stores/tagState.svelte';
	import { type CategoryType, getFirstTagColour } from '$lib/utils/categoryColors';
	import { browser } from '$app/environment';
	import { onMount, type SvelteComponent } from 'svelte';

	let id = $state<string>('');
	let title = $state<string>('');
	let tagArr = $state<Array<CategoryType>>(['CSS']);
	let Visual = $state<SvelteComponent | unknown>();

	onMount(() => {
		id = tagState.id;
		title = tagState.title;
		tagArr = tagState.tagArr;
		Visual = tagState.Visual;
	});

	let { children } = $props();
</script>

<div class="content">
	<!-- Since using global class names for visual, need to add section.post for animations to work -->
	{#if browser}
		<Header />
		{#if Visual && title && tagArr?.length > 0 && id}
			<div style="background-color: {getFirstTagColour(tagArr)}">
				<section class="visual post">
					<div class="svgContainer" style="view-transition-name: visual-{id}">
						<Visual />
					</div>
				</section>
			</div>
			<h1 style="view-transition-name: title-{id}">Real: {title}</h1>

		{/if}
		{@render children()}
	{/if}
</div>

<style lang="scss">
  .content {
    flex-grow: 1;
  }

  .visual {
    .svgContainer {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 440px;

      @media(max-width: px-to-rem(768px)) {
        aspect-ratio: 736/440;
				height: auto;
      }
    }
  }
</style>

<script lang="ts">
	import Header from '$lib/components/Header.svelte';

	let { children } = $props();
</script>

<div class="content">
	<Header/>
	{@render children()}
</div>

<style lang="scss">
	.content {
			flex-grow: 1;
	}
</style>

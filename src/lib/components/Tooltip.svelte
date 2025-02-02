<script lang="ts">
	const { children } = $props();

	const tooltip = $state({
		visible: false,
		content: 'Test content',
		x: 0,
		y:0,
	})

	function handleMouseEnter(event) {
		const target = event.target;
		tooltip.content = target.getAttribute('title'); // Get content from title attribute
		if (tooltip.content) {
			target.removeAttribute('title'); // Prevent default browser tooltip
			tooltip.visible = true;
		}
	}

	function handleMouseLeave(event) {
		const target = event.target;
		if (tooltip.content) {
			target.setAttribute('title', tooltip.content); // Restore title attribute
			tooltip.visible = false;
		}
	}

	function handleMouseMove(event) {
		tooltip.x = event.clientX + 10; // Offset by 10px
		tooltip.y = event.clientY + 10; // Offset by 10px
		console.log(tooltip);
	}
</script>

<svelte:window
	on:mousemove={handleMouseMove}
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
/>

{#if tooltip.visible}
	<div
		class="tooltip"
		style="top: {tooltip.y}px; left: {tooltip.x}px;"
	>
		{tooltip.content}

	</div>
{/if}

<style lang="scss">
  .tooltip {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 5px;
    border-radius: 4px;
    font-size: 14px;
    pointer-events: none; /* Prevent blocking mouse events */
    transform: translate(-50%, -50%);
    z-index: 1000;
    white-space: nowrap;
    transition: opacity 0.2s ease-in-out;
    opacity: 1;
  }
</style>

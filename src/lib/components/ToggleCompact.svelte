<script>
	import { onMount } from 'svelte';
	//import { Icon24Cancel } from '@sveltevk/icons';

	let checked = false;
	let checkedBoolean = 'false';

	onMount(() => {
		const savedState = localStorage.getItem('themeCompactState');
		checkedBoolean = savedState === 'true' ? 'true': 'false';
		checked = checkedBoolean === 'true';
	});

	function toggleCompact() {
		checkedBoolean = (checkedBoolean === 'true') ? 'false': 'true';
		checked = checkedBoolean === 'true';
		localStorage.setItem('themeCompactState', checkedBoolean);
	}
</script>

<label for="toggleCompact" class="theme-toggle">
	<input id="toggleCompact" type="checkbox" bind:checked on:change={toggleCompact} />
	<div class="icon-wrapper">
		<!--<Icon24Cancel />-->
		<p>ICON</p>
	</div>
</label>

<style>
    .theme-toggle {
        cursor: pointer;
    }

    input[type="checkbox"] {
        display: none;
    }

    .icon-wrapper {
        display: inline-block;
        padding: 5px;
        border-radius: 50%;
        transition: background-color 0.3s ease;
    }

    input[type="checkbox"]:checked + .icon-wrapper {
        background-color: #4CAF50;
    }

    :global(body) {
        transition: background-color 0.3s ease, color 0.3s ease;
    }

    :global(body.dark-theme) {
        background-color: #333;
        color: #fff;
    }
</style>

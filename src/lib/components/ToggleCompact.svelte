<script lang="ts">
	import { onMount } from 'svelte';
	//import { Icon24Cancel } from '@sveltevk/icons';

	export let checked: boolean = false;

	onMount(() => {
		const savedState = localStorage.getItem('themeCompactState');
		checked = savedState === 'true';
		console.log('checked isCompact: ', checked);
	});

	function toggleCompact() {
		checked = checked === true;
		localStorage.setItem('themeCompactState', checked.toString());
		console.log('checked isCompact: ', checked);
	}
</script>

<label for="toggleCompact" class="theme-toggle">
	<input id="toggleCompact" type="checkbox" bind:checked on:change={toggleCompact} />
	<div class="icon-wrapper">
		<!--<Icon24Cancel />-->
		<span>Icon</span>
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

    input[type="checkbox"] + .icon-wrapper {
				display: flex;

				align-items: center;
				justify-content: center;
				font-size: 10px;
				background-color: red;
				height: 2rem;
				width: 2rem;
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

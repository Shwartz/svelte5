<script lang="ts">
	import { onDestroy } from 'svelte';

	let count = $state({
		value: 0,
		msg: 'Single digit',
	});
	let intervalId: number;

	$effect(() => {
		if (count.value <= 9) {
			intervalId = setInterval(() => {
				count.value++;
			}, 1000);
		} else {
			clearInterval(intervalId);
		}

		if (count.value > 9) {
			count.msg = 'Double digit';
		}

		return () => clearInterval(intervalId);
	});

	function restart() {
		count.value = 0;
	}

	onDestroy(() => clearInterval(intervalId));
</script>

<p>Count: {count.value} {count.msg}</p>
<p><button type="button" onclick={() => {count.value = 0}}>Restart Counter</button></p>
<p><button type="button" onclick={restart}>Restart Counter</button></p>

<script lang="ts">
	import { useCountState } from '$lib/components/learning/states/countState.svelte';

	const countState = useCountState();
</script>

<p>CompA count state is {countState.count}</p>
<button type="button" onclick={() => countState.increment()}>Increment</button>

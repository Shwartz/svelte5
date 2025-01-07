<script lang="ts">
	import type {QAprops} from '$lib/types/qa';

	let { question = "What is the meaning of life?", answer = '42' }: QAprops = $props();
</script>

<p>If the question is "{question}", then the answer is "{answer}".</p>

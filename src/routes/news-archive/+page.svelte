<script lang="ts">
	import QuestionAndAnswer from '$lib/components/learning/QuestionAndAnswer.svelte';
	import Counter from '$lib/components/learning/Counter.svelte';
	import type { QAprops } from '$lib/types/qa';

	let qa: QAprops = {
		question: "Can this work?",
		answer: "Yes it can!",
	};
</script>

<h1>News Archive</h1>
<Counter/>
<QuestionAndAnswer/>
<QuestionAndAnswer question="How much is 38+4?" />
<QuestionAndAnswer {...qa} />

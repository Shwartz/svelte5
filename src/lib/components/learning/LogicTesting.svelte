<script lang="ts">
	interface Numbers {
		count: number;
		amount: Array<number>;
	}

	let numbers: Numbers = $state({
		count: 0,
		amount: [],
	});

	function increase(e) {
		console.log({e});
		e.target.style.background = 'yellow';
		numbers.count++;
		numbers.amount.push(numbers.count);
	}

	function decrease() {
		numbers.count--;
		numbers.amount.push(numbers.count);
	}

	let outputText = $state('');

</script>

<div class="counter">
	<p>Count is {numbers.count}, clicked: {numbers.amount.length}</p>
	<p>
		<button type="button" onclick={increase}>Increase</button>
		<button type="button" onclick={decrease}>Decrease</button>
	</p>
	<p>Sum: {numbers.amount.reduce((a, b) => a + b, 0)}</p>
</div>

<div>
	<input type="text" bind:value={outputText}>
	<p>Output: {outputText}</p>
</div>

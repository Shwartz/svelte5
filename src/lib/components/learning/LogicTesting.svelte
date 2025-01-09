<script lang="ts">
	interface Numbers {
		count: number;
		amount: Array<number>;
	}

	let numbers: Numbers = $state({
		count: 0,
		amount: [],
	});

	let checked = $state(false);
	let secondChecked = $state(false);

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
	let todo = $state({ name: "", done: false });

</script>

<div>
	<p>Checked {checked} | secondChecked {secondChecked}</p>
	<input type="checkbox" bind:checked/>
	<input type="checkbox" bind:checked={secondChecked}/>
</div>

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

<div>
	<h2>Add Todo</h2>

	<form>
		<label for="name">Todo</label>
		<input
			id="name"
			type="text"
			bind:value={todo.name}
			placeholder="Enter a new todo"
		/>
		<div>
			<input id="done" name="done" type="checkbox" bind:checked={todo.done} />
			<label for="done">Done</label>
		</div>
	</form>

	<p>
		Todo: {todo.name}
	</p>
	<p>
		Done: {todo.done ? "Yes" : "No"}
	</p>
</div>

<script lang="ts">
	type FormDataEntryValue = string | File;

	interface Todo {
		id: string;
		[key: string]: FormDataEntryValue | string | boolean;
		done: boolean;
	}
	let todos = $state<Todo[]>([]);

	const addTodo = (e: SubmitEvent) => {
		const todo = Object.fromEntries(new FormData(e.target as HTMLFormElement)) as Todo;
		todo.id = crypto.randomUUID();
		todos.push(todo);
		(e.target as HTMLFormElement).reset();
		e.preventDefault();
	}

	const removeTodo = (todo: Todo) => {
		todos = todos.filter((t) => t.id !== todo.id);
	}
</script>

<div>
	<h2>Add Todo</h2>
	<form onsubmit={addTodo}>
		<label for="name">Todo</label>
		<input id="name" name="name" type="text" placeholder="Enter a new todo">
		<div>
			<input id="done" name="done" type="checkbox">
			<label for="done">Done</label>
		</div>
		<input type="submit" value="Add Todo">
	</form>

	<h2>Existing todos</h2>
	<ul>
		{#each todos as todo}
			<li>
				<input type="checkbox" bind:checked={todo.done} id={todo.id}>
				<label for={todo.id}>
					{todo.name} ({todo.done ? "done" : "not done"})
				</label>
				<button onclick={() => removeTodo(todo)}>Remove</button>
			</li>
			{/each}
	</ul>
</div>

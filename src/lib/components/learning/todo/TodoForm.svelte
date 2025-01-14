<script lang="ts">
	import type { Todo } from '$lib/components/learning/todo/types';

	let { addTodo } = $props<{
		addTodo: (todo: Todo) => void;
	}>();

	let handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);

		const newTodo: Todo = {
			id: crypto.randomUUID(),
			name: formData.get('name') as string,
			done: formData.get('done') === 'on',
		}
		addTodo(newTodo);
		(e.target as HTMLFormElement).reset();
	}
</script>

<form onsubmit={handleSubmit}>
	<label for="name">Todo</label>
	<input id="name" name="name" type="text" placeholder="Enter a new todo">
	<div>
		<input id="done" name="done" type="checkbox">
		<label for="done">Done</label>
	</div>
	<input type="submit" value="Add Todo">
</form>

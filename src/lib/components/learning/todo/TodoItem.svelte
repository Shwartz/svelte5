<script lang="ts">
	import type { Todo } from '$lib/components/learning/todo/types';

	let { todo, removeTodo }= $props<{
		todo: Todo;
		removeTodo: (todo: Todo) => Todo[];
	}>();
</script>

<input type="checkbox" bind:checked={todo.done} id={todo.id}>
<label for={todo.id}>
	{todo.name} ({todo.done ? "done" : "not done"})
</label>
<button onclick={() => removeTodo(todo)}>Remove</button>

<script lang="ts">
	import TodoForm from '$lib/components/learning/todo/TodoForm.svelte';
	import TodoItem from '$lib/components/learning/todo/TodoItem.svelte';
	import type { Todo } from '$lib/components/learning/todo/types';

	let todos = $state<Todo[]>([]);

	const removeTodo = (todo: Todo): Todo[] => {
		todos = todos.filter((t) => t.id !== todo.id);
		return todos;
	}

	const addTodo = (newTodo: Todo) => {
		todos = [...todos, newTodo];
	}
</script>

<div>
	<h2>Add Todo</h2>

	<TodoForm {addTodo} />

	<h2>Existing todos</h2>
	<ul>
		{#each todos as todo}
			<li>
				<TodoItem {todo} {removeTodo} />
			</li>
		{/each}
	</ul>
</div>

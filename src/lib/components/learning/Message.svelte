<script lang="ts">
	const PUBLIC_API = 'https://catfact.ninja/fact'
	let message = $state('');

	const fetchMessage = async () => {
		const response = await fetch(PUBLIC_API);
		const data = await response.json();
		message = data.fact;
	}
</script>

<button type="button" onclick={fetchMessage}>Fetch Cat facts</button>
<div>{message}</div>

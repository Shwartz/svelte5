<footer>
	<div class="wrapper">
		<div>One 1</div>
		<div>Two</div>
		<div>Three</div>
	</div>
</footer>

<style lang="scss">
  footer {
    margin-top: 6rem;
    border-top: 1px dotted var(--grid-color);
  }

	.wrapper {
		margin-top: 1.5rem;
		border-top: 1px dotted var(--grid-color);
	}

  :global(.gridOff) :is(footer, .wrapper) {
    border-top-color: rgba(0,0,0,0);
  }
</style>


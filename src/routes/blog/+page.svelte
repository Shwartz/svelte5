<script>
	import ToggleCompact from '$lib/components/ToggleCompact.svelte';
</script>
<h1>Blog <span>tags | tags | tags</span></h1>
<div>Toggle Compact: <ToggleCompact /></div>

<div class="blog">
	<section class="post" style="view-transition-name: post-1">
		<div class="visual" style="view-transition-name: visual-1">a</div>
		<div class="content" style="view-transition-content: content-1">
				<div class="icons">
					<div>Time</div>
					<div>Read</div>
					<div>Likes</div>
				</div>
			<div>
				<h1>How to create CSS layout using Flexbox</h1>
				<p>So, you have your first mockup or design in your hands, but how do you translate it to HTML and CSS? Should
					you
					rely on CSS frameworks like Bootstrap, TailwindCSS, or others? No matter your choice, it would benefit you to
					understand the mechanics behind the layout.</p>
				<div class="tags">
					<div>Tag</div>
					<div>Tag</div>
					<div>Tag</div>
				</div>
			</div>
		</div>
	</section>
	<section class="post" style="view-transition-name: post-2">
		<div class="visual" style="view-transition-name: visual-2">a</div>
		<div class="content" style="view-transition-content: content-2">
				<div class="icons">
					<div>Time</div>
					<div>Read</div>
					<div>Likes</div>
				</div>
			<div>
				<h1>How to create CSS layout using Flexbox</h1>
				<p>So, you have your first mockup or design in your hands, but how do you translate it to HTML and CSS? Should
					you
					rely on CSS frameworks like Bootstrap, TailwindCSS, or others? No matter your choice, it would benefit you to
					understand the mechanics behind the layout.</p>
				<div class="tags">
					<div>Tag</div>
					<div>Tag</div>
					<div>Tag</div>
				</div>
			</div>
		</div>
	</section>
	<section class="post" style="view-transition-name: post-3">
		<div class="visual" style="view-transition-name: visual-3">a</div>
		<div class="content" style="view-transition-content: content-3">
				<div class="icons">
					<div>Time</div>
					<div>Read</div>
					<div>Likes</div>
				</div>
			<div>
				<h1>How to create CSS layout using Flexbox</h1>
				<p>So, you have your first mockup or design in your hands, but how do you translate it to HTML and CSS? Should
					you
					rely on CSS frameworks like Bootstrap, TailwindCSS, or others? No matter your choice, it would benefit you to
					understand the mechanics behind the layout.</p>
				<div class="tags">
					<div>Tag</div>
					<div>Tag</div>
					<div>Tag</div>
				</div>
			</div>
		</div>
	</section>
</div>

<style lang="scss">
  .blog {
    background: white;
  }

  .post {
    display: flex;
    gap: 1.5rem;
    border-top: 1px dotted #ffcdcc;
    border-bottom: 1px dotted #ffcdcc;

    &:not(:first-child) {
      margin-top: 1rem;
    }

    &:nth-child(even) {
      flex-direction: row-reverse;
    }
  }

  .visual {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    aspect-ratio: 13/8;
    background: #f9e4b2;
  }

  .content {
    padding: 1.5rem 0;
    width: 50%;
  }

:global(.page:has(input#toggleCompact[type="checkbox"]:checked)) .blog {
	background: #95de95;

  .post {
    flex-direction: row;
  }

  .visual {
    width: 310px;
  }

  .content {
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
  }

  .tags {
    display: flex;
  }
}

</style>


<h1>Blog <span>tags | tags | tags</span></h1>

<div class="blog">
	<section class="blog-left">
		<div class="visual">a</div>
		<div class="content">
			<p>Time | Read | Likes</p>
			<h1>How to create CSS layout using Flexbox</h1>
			<p>So, you have your first mockup or design in your hands, but how do you translate it to HTML and CSS? Should you
				rely on CSS frameworks like Bootstrap, TailwindCSS, or others? No matter your choice, it would benefit you to
				understand the mechanics behind the layout.</p>
			<p>Tag | Tag</p>
		</div>
	</section>
</div>

<style lang="scss">
	.blog {
		background: white;
	}

	.blog-left {
		display: flex;
		gap: 1.5rem;

		> div {
			width: 50%;
		}
	}

  .visual {
    background: red;
  }

	.content {
		padding: 1rem 0;
	}
</style>

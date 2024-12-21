<script lang="ts">
	import { onMount } from 'svelte';
	import ToggleCompact from '$lib/components/ToggleCompact.svelte';
	import { Icon } from 'svelte-icons-pack';
	import { TrOutlineCalendarMonth, TrOutlineClock, TrOutlineHeart } from 'svelte-icons-pack/tr';
	import Tag from '$lib/components/snippets/Tag.svelte';
	import FlexImg from '/src/assets/svg/flexBox.svg?component';

	/**
	 * Icons for the website
	 * https://leshak.github.io/svelte-icons-pack/#/pack/tr
	 * */

	let compact: boolean = false;
	/** Magically comes from ToggleCompact.svelte as I bind it in Component and export from there */
	let checked: boolean;


	onMount(() => {
		const checkbox = document.getElementById('toggleCompact') as HTMLInputElement;
		checkbox.addEventListener('change', toggleView);
		const savedState = localStorage.getItem('themeCompactState');
		compact = savedState === 'true';
	});

	function toggleView() {
		/* Fallback if no support for transition and can do something else */
		if (!document.startViewTransition) {
			compact = checked;
			return;
		}

		document.startViewTransition(() => {
			compact = checked; // this is how I can trigger transition
		});
	}
</script>
<h1>Blog <span>tags | tags | tags</span></h1>
<div>Toggle Compact:
	<ToggleCompact bind:checked />
</div>

<div class="blog" class:compact={compact} class:expanded={!compact}>
	<section class="post" style="view-transition-name: post-1">
		<div class="visual flexBoxSvg" style="view-transition-name: visual-1">
			<FlexImg className="test" />
		</div>
		<div class="content" style="view-transition-name: content-1">
			<div class="icons" style="view-transition-name: icons-1">
				<div>
					<Icon size="16" color="777777" src={TrOutlineCalendarMonth} />
					<span>December, 2024</span>
				</div>
				<div>
					<Icon size="16" color="777777" src={TrOutlineClock} />
					<span>18 min read</span>
				</div>
				<div>
					<Icon size="16" color="777777" src={TrOutlineHeart} />
					<span>112 likes</span>
				</div>
			</div>
			<h1 class="title">How to create CSS layout using Flexbox</h1>
			<p class="intro truncate">
				What to <b>click</b>, <b>hover</b> effects to go for a full article? So, you have your first mockup or design in
				your hands, but how do you translate it to HTML and CSS? Should
				you rely on CSS frameworks like Bootstrap, TailwindCSS, or others? No matter your choice, it would benefit you
				to understand the mechanics behind the layout.</p>
			<div class="tags">
				<Tag blogCategory="JavaScript" />
				<Tag blogCategory="CSS" />
				<Tag blogCategory="Random" />
				<Tag blogCategory="Design" />
			</div>
		</div>
	</section>
	<section class="post" style="view-transition-name: post-2">
		<div class="visual" style="view-transition-name: visual-2">a</div>
		<div class="content" style="view-transition-name: content-2">
			<div class="icons" style="view-transition-name: icons-2">
				<div>
					<Icon size="16" color="777777" src={TrOutlineCalendarMonth} />
					<span>June, 2023</span>
				</div>
				<div>
					<Icon size="16" color="777777" src={TrOutlineClock} />
					<span>5 min read</span>
				</div>
				<div>
					<Icon size="16" color="777777" src={TrOutlineHeart} />
					<span>1 likes</span>
				</div>
			</div>
			<h1 class="title">2D and 3D animations with CSS</h1>
			<p class="intro truncate">Short description</p>
			<div class="tags">
				<Tag blogCategory="Random" />
				<Tag blogCategory="Design" />
			</div>
		</div>
	</section>
	<section class="post" style="view-transition-name: post-3">
		<div class="visual" style="view-transition-name: visual-3">a</div>
		<div class="content" style="view-transition-name: content-3">
			<div class="icons" style="view-transition-name: icons-3">
				<div>
					<Icon size="16" color="777777" src={TrOutlineCalendarMonth} />
					<span>February, 2022</span>
				</div>
				<div>
					<Icon size="16" color="777777" src={TrOutlineClock} />
					<span>11 min read</span>
				</div>
				<div>
					<Icon size="16" color="777777" src={TrOutlineHeart} />
					<span>888 likes</span>
				</div>
			</div>
			<h1 class="title">How to deal with CSS</h1>
			<p class="intro truncate">The common pitfalls with CSS and different approaches to make sense of the project's design,
				front-end and
				maintenance. This is a more philosophical post where I overview my experience dealing with CSS and to find the
				best approach (methodology) for the project.</p>
			<div class="tags">
				<Tag blogCategory="Tools" />
				<Tag blogCategory="CSS" />
				<Tag blogCategory="Random" />
				<Tag blogCategory="Design" />
			</div>
		</div>
	</section>
</div>

<style lang="scss">
  .blog {
    background: white;
  }

  section {
    transition: all 0.3s;
  }

  /* EXPANDED: General styles, Expand as default */
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

    h1, p {
      margin: 0;
    }
  }

  .content {
    display: grid;
    align-items: start;
    width: 50%;
    grid-template-areas:
			'a'
			'b'
			'c'
			'd';
  }

  .icons {
    grid-area: a;
  }

  .title {
    grid-area: b;
  }

  .intro {
    grid-area: c;
  }

  .tags {
    grid-area: d;
  }

  /* Icons */
  .icons {
    display: flex;
    gap: 1rem;
    align-items: center;

    > div {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 14px;

      span {
        display: block;
      }
    }
  }

  .tags {
    margin-top: 1rem;
    display: flex;
    gap: 0.5rem;
  }

  /* EXPANDED specific styles */
  .blog.expanded {
  }

  /* COMPACT */
  .blog.compact {
    .content {
      width: 100%;
      display: grid;
      gap: 0.5rem 1rem;
      grid-template-columns: 1fr auto;
      grid-template-areas:
			"b b"
			"c a"
			"d d";
    }

    .post {
      flex-direction: row;
    }

    h1 {
      font-size: 2.25rem;
      line-height: 2.5rem;
      margin-top: 0;
    }

    .visual {
      align-self: center;
			flex: 0 0 310px;
    }

    .tags {
      display: flex;
      margin-top: 0;
    }

    .intro {
      width: 100%;
    }

    /* Icons */
    .icons {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.2rem;
      flex: 0 0 160px;
      justify-content: center;
      width: 9rem;

      > div {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 14px;

        span {
          display: block;
          text-wrap: nowrap;
        }
      }
    }
  }

  /* Fallback for no JS solution */
  /* Expanded version */
  :global(.no-js:has(input#toggleCompact[type="checkbox"])) .blog {
    .post {
      flex-direction: row;
      background: green;
    }

    .visual {
      width: 50%;
    }

    .content {
      display: flex;
      flex-direction: row-reverse;
      width: 50%;
    }

    .tags {
      display: flex;
    }
  }

  /* Compact version */
  :global(.no-js:has(input#toggleCompact[type="checkbox"]:checked)) .blog {
    background: #95de95;

    .post {
      flex-direction: row;
      background: #3a3a3a;
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

  /* SVG styling */
  /*.visual {
		color: green;
		!*filter: blur(2px);*!
		stroke-width: 5px;
		!*stroke: red;*!
		fill: green;

		&:nth-child(1) {
			!*color: green;
			!*filter: blur(2px);*!
			stroke-width: 5px;
			!*stroke: red;*!
			fill: green;*!


		}*/

  .flexBoxSvg :global(.path1) {
    /*fill: #8a8ac2;*/
    /*stroke: purple;
    stroke-width: 1px;*/
  }

  .flexBoxSvg :global(.path2) {
    filter: blur(2px);
    transform: rotate3d(12, 1, 1, -83deg);
    opacity: 0;
    transition: all 0.5s;
  }

  section:hover .flexBoxSvg :global(.path2) {
    transform: rotate3d(1, 1, 1, 0);
    filter: blur(0px);
    opacity: 1;
  }

  .truncate {
    display: -webkit-box; /* Enables the use of the line-clamp property */
    -webkit-line-clamp: 3; /* Specifies the number of lines to display */
    -webkit-box-orient: vertical; /* Defines the box orientation as vertical */
    overflow: hidden; /* Hides overflowing content */
    text-overflow: ellipsis; /* Adds an ellipsis (...) to truncated content */
  }
</style>


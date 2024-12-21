<script lang="ts">
	import { postsArr } from '$lib/blog/logic/postsConfig';
	import { TrOutlineCalendarMonth, TrOutlineClock, TrOutlineHeart } from 'svelte-icons-pack/tr';
	import Tag from '$lib/components/snippets/Tag.svelte';
	import { Icon } from 'svelte-icons-pack';

	// This is how I get props in child <PostList {selectedFilter />
	export let selectedFilter: string | null = null;
	export let compact: boolean;

	$: filteredPosts = selectedFilter
		? postsArr.filter(post => post.tags.includes(selectedFilter ?? ''))
		: postsArr;
</script>

<div class="blog" class:compact={compact} class:expanded={!compact}>
	{#each filteredPosts as {url, title, description, tags, publishedDate, readingTime, likes, Visual}, index}
		<section class="post" style="view-transition-name: post-{index}">
			<div class="visual" style="view-transition-name: visual-{index}">
				<Visual />
			</div>
			<div class="content" style="view-transition-name: content-{index}">
				<div class="icons" style="view-transition-name: icons-{index}">
					<div>
						<Icon size="16" color="777777" src={TrOutlineCalendarMonth} />
						<span>{publishedDate}</span>
					</div>
					<div>
						<Icon size="16" color="777777" src={TrOutlineClock} />
						<span>{readingTime}</span>
					</div>
					<div>
						<Icon size="16" color="777777" src={TrOutlineHeart} />
						<span>{likes}</span>
					</div>
				</div>
				<h1 class="title">
					<a href="{url}">{title}</a>
				</h1>
				<p class="intro truncate">{description}</p>
				<div class="tags">
					{#each tags as tag}
						<Tag blogCategory={tag} />
					{/each}
				</div>
			</div>

		</section>
	{/each}
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

  .truncate {
    display: -webkit-box; /* Enables the use of the line-clamp property */
    -webkit-line-clamp: 3; /* Specifies the number of lines to display */
    -webkit-box-orient: vertical; /* Defines the box orientation as vertical */
    overflow: hidden; /* Hides overflowing content */
    text-overflow: ellipsis; /* Adds an ellipsis (...) to truncated content */
  }
</style>

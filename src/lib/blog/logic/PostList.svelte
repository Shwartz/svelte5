<script lang="ts">
	import { postsArr } from '$lib/blog/logic/postsConfig';
	import { TrOutlineCalendarMonth, TrOutlineClock, TrOutlineHeart } from 'svelte-icons-pack/tr';
	import Tag from '$lib/components/snippets/Tag.svelte';
	import { Icon } from 'svelte-icons-pack';
	import { type CategoryType, getCategoryColor } from '$lib/utils/categoryColors';

	interface PostListProps {
		selectedFilter: string | null;
		compact: boolean;
		onCountChange?: (count: number) => void;
		numberOfPosts?: number;
	}

	let { selectedFilter, compact, onCountChange, numberOfPosts }: PostListProps = $props();

	const filteredPosts = $derived(() => {
		if (numberOfPosts) {
			return postsArr.slice(0, numberOfPosts);
		}
		return selectedFilter
			? postsArr.filter(post => post.tags.includes(selectedFilter!))
			: postsArr;
	});

	$effect(() => {
		if (onCountChange) {
			onCountChange(filteredPosts().length);
		}
	});

	const getFirstTagColour = (tags: CategoryType[]): string => {
		if (tags.length > 0) {
			return getCategoryColor(tags[0] as CategoryType);
		}
		return 'var(--pastel-cream)'; // Fallback colour
	};
</script>

<div class="blog" class:compact={compact} class:expanded={!compact}>
	{#each filteredPosts() as { url, title, description, tags, publishedDate, readingTime, likes, Visual }, index}
		<a href="{url}">
			<section class="post" style="view-transition-name: post-{index}">
				<div class="visual"
						 style="background-color: {getFirstTagColour(tags as CategoryType[])}; view-transition-name: visual-{index}">
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
					<h1 class="title">{title}</h1>
					<p class="intro truncate">{description}</p>
					<div class="tags">
						{#each tags as tag}
							<Tag blogCategory={tag as CategoryType} />
						{/each}
					</div>
				</div>
			</section>
		</a>
	{/each}
</div>

<style lang="scss">
  .blog {
    a {
      cursor: url('src/assets/svg/cursor.svg') 16 16, auto;
    }

    a:hover {
      cursor: url('src/assets/svg/cursor.svg') 16 16, pointer;
    }
  }

  /* EXPANDED: General styles, Expand as default */
  .post {
    display: flex;
    gap: 1.5rem;
    margin-top: 1.5rem;
    padding-bottom: 1.5rem;
    border-top: 1px dotted var(--grid-color);
    border-bottom: 1px dotted var(--grid-color);

    &:nth-child(even) {
      flex-direction: row-reverse;
    }
  }

  /* Toggle background grid lines */
  :global(.gridOff) .post {
    border-top-color: rgba(0, 0, 0, 0);
    border-bottom-color: rgba(0, 0, 0, 0);
  }

  .visual {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    aspect-ratio: 13/8;
    /*background: #f9e4b2;*/
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
    padding: 1.5rem 0;

    h1, p {
      margin: 0;
    }
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
      flex: 0 0 21rem;
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
  /*   no-js Expanded version */
  :global(.no-js:has(input#toggleCompact[type="checkbox"])) .blog {
    .post {
      flex-direction: row;
    }

    .visual {
      width: 50%;
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
      padding: 1.5rem 0;

      h1, p {
        margin: 0;
      }
    }

    .tags {
      display: flex;
    }
  }

  /*   no-js Compact version */
  :global(.no-js:has(input#toggleCompact[type="checkbox"]:checked)) .blog {
    .post {
      flex-direction: row;
    }

    .visual {
      align-self: center;
      flex: 0 0 21rem;
    }

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

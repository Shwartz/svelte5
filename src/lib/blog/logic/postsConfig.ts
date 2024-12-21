import FlexImg from '$lib/blog/heroSvg/ImgPost1.svelte';
import {base} from "$app/paths";


export const postsArr = [
	{
		url: '/url1',
		title: 'Post 1',
		description: 'Some description here 1',
		tags: ['JavaScript', 'CSS'],
		publishedDate: 'December, 2024',
		readingTime: '10 min read',
		likes: '54 likes',
		Visual: FlexImg
	},
	{
		url: `${base}/thoughts/svelte-vs-reactjs`,
		title: 'Svelte vs ReactJS',
		description: 'The Svelte vs React argument is straightforward when the project requirements are clearly defined.',
		tags: ['JavaScript'],
		publishedDate: 'September, 2022',
		readingTime: '18 min read',
		likes: '112 likes',
		Visual: FlexImg
	}
];



import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  const { slug } = params;
  console.log({ slug });
  return { slug };
};

export function entries() {
  // Return an array of slugs that should be prerendered
  return [
    { slug: 'how-to-build-css-layout-using-flexbox' },
    { slug: 'build-error-on-vercel' },
    { slug: '2d-3d-animations-with-css' },
    { slug: 'practical-usage-of-CSS-pseudo-selectors' },
    { slug: 'how-to-deal-with-CSS' },
    { slug: 'svelte-vs-reactjs' },
    // Add more slugs as needed
  ];
}

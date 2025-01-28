export const predefinedCategories = {
	JavaScript: 'var(--pastel-mint)',
	CSS: 'var(--pastel-orange)',
	Tools: 'var(--pastel-rose)',
	Design: 'var(--pastel-purple)',
	Random: 'var(--pastel-lime)'
} as const;

export type CategoryType = keyof typeof predefinedCategories;

export function getCategoryColor(category: CategoryType): string {
	return predefinedCategories[category] || 'var(--default-color)';
}

export type ValidHeadingIndex = 1 | 2 | 3 | 4 | 5 | 6;

export function getValidHeadingIndex(x: number): ValidHeadingIndex {
	if (x < 1) return 1;
	if (x > 6) return 6;
	// We have to cast here, but it will be the correct type
	return Math.round(x) as ValidHeadingIndex;
}

export const h: Record<
	ValidHeadingIndex,
	React.ElementType<React.HTMLProps<HTMLHeadingElement>>
> = { 1: 'h1', 2: 'h2', 3: 'h3', 4: 'h4', 5: 'h5', 6: 'h6' };

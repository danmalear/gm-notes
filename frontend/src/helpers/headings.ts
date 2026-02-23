export type ValidHeadingIndex = 1 | 2 | 3 | 4 | 5 | 6;

export const h: (
	| React.ElementType<React.HTMLProps<HTMLHeadingElement>>
	| undefined
)[] = [undefined, 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

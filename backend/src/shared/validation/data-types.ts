import type { AbsoluteLighting } from '#shared/data-types.ts';

const lightingValues: AbsoluteLighting[] = [
	'Bright Light',
	'Dim Light',
	'Darkness',
];

export function isLighting(value: string): value is AbsoluteLighting {
	return (lightingValues as string[]).includes(value);
}

import type { AbsoluteLightingDto } from '#shared/data-types.ts';

const lightingValues: AbsoluteLightingDto[] = [
	'Bright Light',
	'Dim Light',
	'Darkness',
];

export function isLighting(value: string): value is AbsoluteLightingDto {
	return (lightingValues as string[]).includes(value);
}

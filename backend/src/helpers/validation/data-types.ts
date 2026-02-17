import type { Lighting } from '#dtos/data-types.ts';

const lightingValues: Lighting[] = ['Bright Light', 'Dim Light', 'Darkness'];

export function isLighting(value: string): value is Lighting {
	return (lightingValues as string[]).includes(value);
}

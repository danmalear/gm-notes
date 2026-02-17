export type Lighting = 'Darkness' | 'Dim Light' | 'Bright Light';
// @TODO this will be used in regions to change based on map lighting
export type RelativeLighting =
	| Lighting
	| 'Default'
	| 'Default+'
	| 'Default++'
	| 'Default-'
	| 'Default--';

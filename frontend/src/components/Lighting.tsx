import type {
	Lighting as LightingType,
	RelativeLighting,
} from '#dtos/data-types.ts';
import Trait from './Trait.tsx';

export interface LightingProps {
	defaultLighting: LightingType;
	lighting: RelativeLighting;
}

const Lighting: React.FC<LightingProps> = ({ defaultLighting, lighting }) => {
	const brighten = (lighting: LightingType): LightingType => {
		switch (lighting) {
			case 'Darkness':
				return 'Dim Light';
			case 'Dim Light':
				return 'Bright Light';
			default:
				return lighting;
		}
	};

	const darken = (lighting: LightingType): LightingType => {
		switch (lighting) {
			case 'Bright Light':
				return 'Dim Light';
			case 'Dim Light':
				return 'Darkness';
			default:
				return lighting;
		}
	};

	const displayLighting = (lighting: RelativeLighting): LightingType => {
		switch (lighting) {
			case 'Default':
				return defaultLighting;
			case 'Default+':
				return brighten(defaultLighting);
			case 'Default-':
				return darken(defaultLighting);
			default:
				return lighting;
		}
	};
	return <Trait label="Lighting">{displayLighting(lighting)}</Trait>;
};

export default Lighting;

import atticRegions from './deathHouseAttic.tsx';
import dungeonLevel1Regions from './deathHouseDungeon1.tsx';
import dungeonLevel2Regions from './deathHouseDungeon2.tsx';
import firstFloorRegions from './deathHouseFirstFloor.tsx';
import secondFloorRegions from './deathHouseSecondFloor.tsx';
import thirdFloorRegions from './deathHouseThirdFloor.tsx';
import type { Map } from './MapData.ts';

const deathHouseData: Map = {
	image: {
		src: '/src/assets/death-house.jpg',
		sizeX: 5455,
		sizeY: 7500,
	},
	regions: {
		...firstFloorRegions,
		...secondFloorRegions,
		...thirdFloorRegions,
		...atticRegions,
		...dungeonLevel1Regions,
		...dungeonLevel2Regions,
	},
};

export default deathHouseData;

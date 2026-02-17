import type { RegionResponse } from '#dtos/Region.js';
import { useEffect, useReducer, useState } from 'react';
import {
	RegionDetailsContext,
	RegionDetailsDispatchContext,
} from '../contexts/RegionDetailsContext.ts';
import type {
	Map,
	Region,
	TimeOfDay,
	ValidPartySize,
} from '../data/MapData.ts';
import { getMessage } from '../helpers/error.ts';
import { isUUID } from '../helpers/uuid.ts';
import collapsiblesReducer from '../reducers/collapsibleReducer.ts';
import { getRegion } from '../services/regionService.ts';
import AbilityCheck from './AbilityCheck.tsx';
import Collapsible from './Collapsible.tsx';
import CopyLink from './CopyLink.tsx';
import Creature from './Creature.tsx';
import Item from './Item.tsx';
import './RegionDetails.css';
import Trait from './Trait.tsx';

export interface RegionDetailsProps extends React.PropsWithChildren {
	regionId: string;
	mapDataHC: Map;
	timeOfDay: TimeOfDay;
	partySize: ValidPartySize;
}

const RegionDetails: React.FC<RegionDetailsProps> = ({
	regionId,
	// @TODO remove this dependency
	mapDataHC,
	timeOfDay,
	partySize,
}) => {
	const [regionLoading, setRegionLoading] = useState(true);
	const [region, setRegion] = useState<RegionResponse | Region | null>(null);

	const [collapsibles, dispatch] = useReducer(collapsiblesReducer, {
		openCollapsibles: {},
	});

	const handleResetCollapsibles = () => {
		dispatch({
			type: 'collapsiblesReset',
		});
	};

	useEffect(() => {
		handleResetCollapsibles();

		// @TODO Remove dependency
		if (isUUID(regionId)) {
			setRegionLoading(true);
			getRegion(regionId)
				.then((region) => {
					setRegion(region.data.data);
				})
				.catch((err) => {
					console.error(getMessage(err));
					throw err;
				})
				.finally(() => {
					setRegionLoading(false);
				});
		} else {
			setRegion(mapDataHC.regions[regionId] ?? null);
		}
	}, [regionId, mapDataHC.regions]);

	return (
		<RegionDetailsContext.Provider value={collapsibles}>
			<RegionDetailsDispatchContext.Provider value={dispatch}>
				{regionLoading ? (
					<div />
				) : region ? (
					<div id={regionId + '-details'} className="region-details p-2">
						<h1>
							{/* @TODO remove this dependency */}
							{'code' in region && region.code ? region.code + '. ' : ''}
							{region.name}
						</h1>

						{/* @TODO */}
						{'lighting' in region && region.lighting ? (
							<Trait label="Lighting">{region.lighting[timeOfDay]}</Trait>
						) : null}

						{/* @TODO */}
						{'descriptions' in region && region.descriptions?.length ? (
							<Collapsible headingElement="h2" title="Descriptions">
								{region.descriptions.map((desc, index) => (
									<div key={`description-${index}`}>
										<Collapsible headingElement="h3" title={desc.prompt}>
											{desc.text}
										</Collapsible>
									</div>
								))}
							</Collapsible>
						) : null}

						{/* @TODO */}
						{'creatures' in region && region.creatures?.length ? (
							<Collapsible headingElement="h2" title="Creatures">
								{region.creatures.map((creature, index) => (
									<div key={`creature-${index}`}>
										<Creature
											creature={creature}
											partySize={partySize}
											headingElement="h3"
											rolesHeadingElement="h4"
										/>
									</div>
								))}
							</Collapsible>
						) : null}

						{/* @TODO */}
						{'checks' in region && region.checks?.length ? (
							<Collapsible headingElement="h2" title="Ability Checks">
								{region.checks.map((check, index) => (
									<div key={`check-${index}`}>
										<AbilityCheck
											check={check}
											headingElement="h3"
											prereqsHeadingElement="h4"
										/>
									</div>
								))}
							</Collapsible>
						) : null}

						{/* @TODO */}
						{'items' in region && region.items?.length ? (
							<Collapsible headingElement="h2" title="Items">
								{region.items.map((item, index) => (
									<Item
										key={`item-${index}`}
										item={item}
										headingElement="h3"
										subHeadingElement="h4"
									/>
								))}
							</Collapsible>
						) : null}

						{/* @TODO */}
						{'opportunities' in region && region.opportunities?.length ? (
							<Collapsible headingElement="h2" title="Opportunities">
								<ul>
									{region.opportunities.map((opportunity, index) => (
										<li key={`opportunity-${index}`}>{opportunity}</li>
									))}
								</ul>
							</Collapsible>
						) : null}

						{/* @TODO */}
						{'handouts' in region && region.handouts?.length ? (
							<Collapsible headingElement="h2" title="Handouts">
								<ul>
									{region.handouts.map((handout, index) => (
										<li key={`handout-${index}`}>
											{handout.url ? (
												<CopyLink href={handout.url}>{handout.text}</CopyLink>
											) : (
												handout.text
											)}
										</li>
									))}
								</ul>
							</Collapsible>
						) : null}

						{/* @TODO */}
						{'notes' in region && region.notes?.length ? (
							<Collapsible headingElement="h2" title="Other Notes">
								<ul>
									{region.notes.map((note, index) => (
										<li key={`region-note-${index}`}>{note}</li>
									))}
								</ul>
							</Collapsible>
						) : null}
					</div>
				) : (
					'Error loading region'
				)}
			</RegionDetailsDispatchContext.Provider>
		</RegionDetailsContext.Provider>
	);
};

export default RegionDetails;

import type { RegionResponse } from '#dtos/Region.ts';
import type { UUID } from 'crypto';
import { useContext, useEffect, useReducer, useState } from 'react';
import { useLoaderData } from 'react-router';
import AbilityCheck from '../components/AbilityCheck.tsx';
import Collapsible from '../components/Collapsible.tsx';
import CopyLink from '../components/CopyLink.tsx';
import Creature from '../components/Creature.tsx';
import Item from '../components/Item.tsx';
import Trait from '../components/Trait.tsx';
import { LegacyContext } from '../contexts/LegacyContext.ts';
import { MapContext } from '../contexts/MapContext.ts';
import {
	RegionDetailsContext,
	RegionDetailsDispatchContext,
} from '../contexts/RegionDetailsContext.ts';
import type { Region, ValidPartySize } from '../data/MapData.ts';
import collapsiblesReducer from '../reducers/collapsibleReducer.ts';
import { regionLoader } from './loaders/regionLoader.ts';
import './RegionView.css';

// @TODO remove this dependency
const partySize: ValidPartySize = 3;

const RegionView: React.FC = () => {
	const loadedRegion = useLoaderData<typeof regionLoader>().region;
	const [region, setRegion] = useState<Region | RegionResponse | undefined>(
		undefined,
	);
	const [regionId] = useState<UUID | string>(
		useLoaderData<typeof regionLoader>().regionId,
	);

	// @TODO this might be better solved with a websocket so the loaded data is always good
	useEffect(() => {
		setRegion(loadedRegion);
	}, [loadedRegion]);

	const map = useContext(MapContext);

	// #region collapsibles
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
	}, []);
	// #endregion

	const timeOfDay = useContext(LegacyContext).timeOfDay;

	return (
		<RegionDetailsContext.Provider value={collapsibles}>
			<RegionDetailsDispatchContext.Provider value={dispatch}>
				{region ? (
					<div id={regionId + '-details'} className="region-view p-2">
						<h1>
							{/* @TODO remove this dependency */}
							{'code' in region && region.code ? region.code + '. ' : ''}
							{region.name}
						</h1>

						{/* @TODO */}
						<p>Map Default Lighting (test): {map.defaultLighting}</p>
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
				) : null}
			</RegionDetailsDispatchContext.Provider>
		</RegionDetailsContext.Provider>
	);
};

export default RegionView;

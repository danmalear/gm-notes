import AbilityCheck from '#ability-check/AbilityCheck.tsx';
import Action from '#action/Action.tsx';
import { MapContext } from '#map/MapContext.ts';
import Narration from '#narration/Narration.tsx';
import { useContext, useEffect, useReducer } from 'react';
import { useLoaderData } from 'react-router';
import Collapsible from '../components/Collapsible.tsx';
import Creature from '../components/Creature.tsx';
import { Handout } from '../components/Handout.tsx';
import Item from '../components/Item.tsx';
import Lighting from '../components/Lighting.tsx';
import Trait from '../components/Trait.tsx';
import {
	CollapsiblesContext,
	CollapsiblesDispatchContext,
} from '../contexts/CollapsiblesContext.ts';
import { LegacyContext } from '../contexts/LegacyContext.ts';
import {
	RegionContext,
	RegionDispatchContext,
} from '../contexts/RegionContext.ts';
import type { ValidPartySize } from '../data/MapData.ts';
import collapsiblesReducer from '../reducers/collapsibleReducer.ts';
import type { regionLoader } from './loaders/regionLoader.ts';
import './RegionView.css';

// @TODO remove this dependency
const partySize: ValidPartySize = 3;

const RegionView: React.FC = () => {
	const loadedData = useLoaderData<typeof regionLoader>();

	const regionState = useContext(RegionContext);
	const regionDispatch = useContext(RegionDispatchContext);

	// @TODO this might be better solved with a websocket so the loaded data is always good
	useEffect(() => {
		if (loadedData.region && loadedData.regionId) {
			regionDispatch({
				type: 'changed_region',
				region: loadedData.region,
				regionId: loadedData.regionId,
			});
		}
	}, [loadedData, regionDispatch]);

	const { region, regionId } = regionState;

	const map = useContext(MapContext).map;

	// #region collapsibles
	const [collapsibles, collapsiblesDispatch] = useReducer(collapsiblesReducer, {
		openCollapsibles: {},
	});

	const handleResetCollapsibles = () => {
		collapsiblesDispatch({
			type: 'collapsiblesReset',
		});
	};

	useEffect(() => {
		handleResetCollapsibles();
	}, [region]);
	// #endregion

	const timeOfDay = useContext(LegacyContext).timeOfDay;

	return (
		<CollapsiblesContext.Provider value={collapsibles}>
			<CollapsiblesDispatchContext.Provider value={collapsiblesDispatch}>
				{region ? (
					<div id={regionId + '-details'} className="region-view p-2">
						<h1>
							{/* @TODO remove this dependency */}
							{'code' in region && region.code ? region.code + '. ' : ''}
							{region.name}
						</h1>

						{'lighting' in region && region.lighting ? (
							typeof region.lighting === 'string' ? (
								<Lighting
									defaultLighting={map.defaultLighting}
									lighting={region.lighting}
								/>
							) : (
								// @TODO Remove this dependency
								<Trait label="Lighting">{region.lighting[timeOfDay]}</Trait>
							)
						) : null}

						{/* @TODO Remove this dependency */}
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

						{'narrations' in region && region.narrations?.length ? (
							<Collapsible headingElement="h2" title="Narrations">
								{region.narrations.map((narration, index) => (
									<Narration
										key={`narration-${index}`}
										narrationStub={narration}
										topLevelHeading={3}
									/>
								))}
							</Collapsible>
						) : null}

						{/* @TODO */}
						{'creatures' in region && region.creatures?.length ? (
							<Collapsible headingElement="h2" title="Creatures">
								{region.creatures.map((creature, index) => (
									<Creature
										key={`creature-${index}`}
										creature={creature}
										partySize={partySize}
										headingElement="h3"
										rolesHeadingElement="h4"
									/>
								))}
							</Collapsible>
						) : null}

						{'actions' in region && region.actions.length ? (
							<Collapsible headingElement="h2" title="Actions">
								{region.actions.map((action) => (
									<Action
										key={`region-${region.id}-action-${action.id}`}
										actionStub={action}
										topLevelHeading={3}
									/>
								))}
							</Collapsible>
						) : null}

						{/* @TODO Remove this dependency */}
						{'checks' in region && region.checks?.length ? (
							<Collapsible headingElement="h2" title="Ability Checks">
								{region.checks.map((check, index) => (
									<AbilityCheck
										key={`check-${index}`}
										checkStub={check}
										topLevelHeading={3}
									/>
								))}
							</Collapsible>
						) : null}

						{'items' in region && region.items?.length ? (
							<Collapsible headingElement="h2" title="Items">
								{region.items.map((item, index) => (
									<Item key={`item-${index}`} item={item} topLevelHeading={3} />
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

						{'handouts' in region && region.handouts?.length ? (
							<Collapsible headingElement="h2" title="Handouts">
								<ul>
									{region.handouts.map((handout, index) => (
										<Handout
											key={`region-${regionId}-handout-${index}`}
											handout={handout}
										/>
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
			</CollapsiblesDispatchContext.Provider>
		</CollapsiblesContext.Provider>
	);
};

export default RegionView;

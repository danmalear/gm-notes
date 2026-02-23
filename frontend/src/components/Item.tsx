import type { LocationItemStub } from '#dtos/item.ts';
import type { Item as ItemHC } from '../data/MapData.ts';
import {
	getValidHeadingIndex,
	h,
	ValidHeadingIndex,
} from '../helpers/headings.ts';
import Action from './Action.tsx';
import Collapsible from './Collapsible.tsx';
import Trait from './Trait.tsx';

// @TODO accommodate contained items loaded from data

export interface ItemProps extends React.PropsWithChildren {
	item: ItemHC | LocationItemStub;
	topLevelHeading: ValidHeadingIndex;
}

const Item: React.FC<ItemProps> = ({ item, ...props }) => {
	const headingText = (item: ItemHC | LocationItemStub) => {
		const quantityText = (item.quantity ?? 1) > 1 ? ` x${item.quantity}` : '';
		return `${item.name}${quantityText}`;
	};

	const H1 = h[props.topLevelHeading];
	const H2 = h[getValidHeadingIndex(props.topLevelHeading + 1)];

	const hasDetails =
		item.value ||
		item.notes?.length ||
		('items' in item && item.items?.length) ||
		('actions' in item && item.actions?.length);

	return hasDetails ? (
		<Collapsible headingElement={H1} title={headingText(item)}>
			{item.value ? <Trait label="Value">{item.value}</Trait> : null}
			{item.notes ? (
				<ul>
					{item.notes.map((note, noteIndex) => (
						<li key={`note-${noteIndex}`}>{note}</li>
					))}
				</ul>
			) : null}
			{'actions' in item && item.actions.length ? (
				<Collapsible headingElement={H2} title="Actions">
					{item.actions.map((action) => (
						<Action
							action={action}
							topLevelHeading={getValidHeadingIndex(props.topLevelHeading + 2)}
						/>
					))}
				</Collapsible>
			) : null}
			{'items' in item
				? item.items?.map((subItem, subIndex) =>
						subItem.value || subItem.notes?.length ? (
							<Collapsible
								key={`item-${subItem.name}-${subIndex}`}
								headingElement={H2}
								title={headingText(subItem)}
							>
								<div>
									{subItem.value ? (
										<Trait label="Value">{subItem.value}</Trait>
									) : null}
									{subItem.notes ? (
										<ul>
											{subItem.notes.map((note, noteIndex) => (
												<li key={`note-${noteIndex}`}>{note}</li>
											))}
										</ul>
									) : null}
								</div>
							</Collapsible>
						) : (
							<H2>{headingText(subItem)}</H2>
						),
					)
				: null}
		</Collapsible>
	) : (
		<H1>{headingText(item)}</H1>
	);
};

export default Item;

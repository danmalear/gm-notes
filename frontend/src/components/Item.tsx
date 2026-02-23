import type { LocationItemStub } from '#dtos/item.ts';
import type { Item as ItemHC } from '../data/MapData.ts';
import { h, type ValidHeadingIndex } from '../helpers/headings.ts';
import Collapsible from './Collapsible.tsx';
import Trait from './Trait.tsx';

// @TODO accommodate contained items loaded from data

export interface ItemProps extends React.PropsWithChildren {
	item: ItemHC | LocationItemStub;
	topLevelHeading: ValidHeadingIndex;
}

const Item: React.FC<ItemProps> = ({ item, ...props }) => {
	const headingText = (item: ItemHC | LocationItemStub) => {
		const quantityText = (item.quantity ?? 1 > 1) ? ` x${item.quantity}` : '';
		return `${item.name}${quantityText}`;
	};

	const H1 = h[props.topLevelHeading] ?? 'h1';
	const H2 =
		(props.topLevelHeading >= 6 ? h[6] : h[props.topLevelHeading + 1]) ?? 'h2';
	const H3 =
		(props.topLevelHeading >= 5 ? h[6] : h[props.topLevelHeading + 2]) ?? 'h3';

	return item.value ||
		item.notes?.length ||
		('items' in item && item.items?.length) ? (
		<Collapsible headingElement={H1} title={headingText(item)}>
			{item.value ? <Trait label="Value">{item.value}</Trait> : null}
			{item.notes ? (
				<ul>
					{item.notes.map((note, noteIndex) => (
						<li key={`note-${noteIndex}`}>{note}</li>
					))}
				</ul>
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

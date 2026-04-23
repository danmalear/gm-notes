import Action from '#action/Action.tsx';
import type { LocationItemStub } from '#dtos/item.ts';
import { MouseEvent, useState } from 'react';
import type { Item as ItemHC } from '../data/MapData.ts';
import {
	getValidHeadingIndex,
	h,
	ValidHeadingIndex,
} from '../helpers/headings.ts';
import { filePath } from '../services/fileService.ts';
import Collapsible from './Collapsible.tsx';
import CopyLink from './CopyLink.tsx';
import ImageModal from './modals/ImageModal.tsx';
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

	const [imageModalOpened, setImageModalOpened] = useState(false);

	const handleOpenImageModalClick = (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		setImageModalOpened(true);
	};

	const hasDetails =
		item.value ||
		('detailsLink' in item && item.detailsLink) ||
		('imageFileId' in item && item.imageFileId) ||
		item.notes?.length ||
		('items' in item && item.items?.length) ||
		('actions' in item && item.actions?.length);

	return hasDetails ? (
		<>
			{'imageFileId' in item && item.imageFileId ? (
				<ImageModal
					imagePath={filePath(item.imageFileId)}
					opened={imageModalOpened}
					onClose={() => setImageModalOpened(false)}
					title={item.name}
				/>
			) : null}
			<Collapsible headingElement={H1} title={headingText(item)}>
				{item.value ? <Trait label="Value">{item.value}</Trait> : null}
				{'imageFileId' in item && item.imageFileId ? (
					<a href="#" onClick={handleOpenImageModalClick}>
						Image
					</a>
				) : null}
				{'detailsLink' in item && item.detailsLink ? (
					<CopyLink href={item.detailsLink}>Details</CopyLink>
				) : null}
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
								actionStub={action}
								topLevelHeading={getValidHeadingIndex(
									props.topLevelHeading + 2,
								)}
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
		</>
	) : (
		<H1>{headingText(item)}</H1>
	);
};

export default Item;

import Action from '#action/Action.tsx';
import { filePath } from '#file/file-service.ts';
import Collapsible from '#shared/collapsible/Collapsible.tsx';
import CopyLink from '#shared/data/CopyLink.tsx';
import ImageModal from '#shared/data/ImageModal.tsx';
import Trait from '#shared/data/Trait.tsx';
import {
	getValidHeadingIndex,
	h,
	type ValidHeadingIndex,
} from '#shared/headings.ts';
import {
	useState,
	type FC,
	type MouseEvent,
	type PropsWithChildren,
} from 'react';
import type { Item as ItemHC } from '../legacy/MapData.ts';
import type { LocationItemStub } from './item-dtos.ts';

// @TODO accommodate contained items loaded from data

export interface ItemProps extends PropsWithChildren {
	itemStub: ItemHC | LocationItemStub;
	topLevelHeading: ValidHeadingIndex;
}

const Item: FC<ItemProps> = ({ itemStub, ...props }) => {
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

	return (
		<>
			<Collapsible headingElement={H1} title={headingText(itemStub)}>
				{'imageFileId' in itemStub && itemStub.imageFileId ? (
					<ImageModal
						imagePath={filePath(itemStub.imageFileId)}
						opened={imageModalOpened}
						onClose={() => setImageModalOpened(false)}
						title={itemStub.name}
					/>
				) : null}
				{itemStub.value ? <Trait label="Value">{itemStub.value}</Trait> : null}
				{'imageFileId' in itemStub && itemStub.imageFileId ? (
					<a href="#" onClick={handleOpenImageModalClick}>
						Image
					</a>
				) : null}
				{'detailsLink' in itemStub && itemStub.detailsLink ? (
					<CopyLink href={itemStub.detailsLink}>Details</CopyLink>
				) : null}
				{itemStub.notes ? (
					<ul>
						{itemStub.notes.map((note, noteIndex) => (
							<li key={`note-${noteIndex}`}>{note}</li>
						))}
					</ul>
				) : null}
				{'actions' in itemStub && itemStub.actions.length ? (
					<Collapsible headingElement={H2} title="Actions">
						{itemStub.actions.map((action) => (
							<Action
								actionStub={action}
								topLevelHeading={getValidHeadingIndex(
									props.topLevelHeading + 2,
								)}
							/>
						))}
					</Collapsible>
				) : null}
				{'items' in itemStub
					? itemStub.items?.map((subItem, subIndex) =>
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
	);
};

export default Item;

import Action from '#action/Action.tsx';
import { filePath } from '#file/file-service.ts';
import Collapsible from '#shared/collapsible/Collapsible.tsx';
import CopyLink from '#shared/data/CopyLink.tsx';
import ImageModal from '#shared/data/ImageModal.tsx';
import Trait from '#shared/data/Trait.tsx';
import { getMessage } from '#shared/error.ts';
import {
	getValidHeadingIndex,
	h,
	type ValidHeadingIndex,
} from '#shared/headings.ts';
import SkeletonP from '#shared/skeleton/SkeletonP.tsx';
import {
	useCallback,
	useState,
	type FC,
	type MouseEvent,
	type PropsWithChildren,
} from 'react';
import type { Item as ItemHC } from '../legacy/MapData.ts';
import type { LocationItemResponse, LocationItemStub } from './item-dtos.ts';
import { getLocationItem } from './item-service.ts';

// @TODO accommodate contained items loaded from data

export interface ItemProps extends PropsWithChildren {
	itemStub: ItemHC | LocationItemStub;
	topLevelHeading: ValidHeadingIndex;
}

const Item: FC<ItemProps> = ({ itemStub, ...props }) => {
	const isLegacy = (
		itemStub: ItemHC | LocationItemStub,
	): itemStub is ItemHC => {
		return !('isContainer' in itemStub);
	};

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

	const [item, setItem] = useState<LocationItemResponse | undefined>(undefined);

	const loadItem = useCallback(() => {
		if (isLegacy(itemStub)) return;

		getLocationItem(itemStub.id)
			.then((res) => {
				setItem(res.data.data);
			})
			.catch((e) => {
				console.error(e);
				alert(getMessage(e));
			});
	}, [itemStub]);

	const handleExpanded = () => {
		if (!item && !isLegacy(itemStub)) {
			loadItem();
		}
	};

	// @TODO remove these once legacy is gone
	const value = isLegacy(itemStub) ? itemStub.value : item?.value;
	const notes = isLegacy(itemStub) ? itemStub.notes : item?.notes;

	return (
		<>
			<Collapsible
				headingElement={H1}
				title={headingText(itemStub)}
				onExpanded={handleExpanded}
			>
				{item || isLegacy(itemStub) ? (
					<>
						{item?.imageFileId ? (
							<ImageModal
								imagePath={filePath(item.imageFileId)}
								opened={imageModalOpened}
								onClose={() => setImageModalOpened(false)}
								title={item.name}
							/>
						) : null}
						{value ? <Trait label="Value">{value}</Trait> : null}
						{item?.imageFileId ? (
							<a href="#" onClick={handleOpenImageModalClick}>
								Image
							</a>
						) : null}
						{item?.detailsLink ? (
							<CopyLink href={item.detailsLink}>Details</CopyLink>
						) : null}
						{notes ? (
							<ul>
								{notes.map((note, noteIndex) => (
									<li key={`note-${noteIndex}`}>{note}</li>
								))}
							</ul>
						) : null}
						{item?.actions.length ? (
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
						{isLegacy(itemStub)
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
					</>
				) : (
					<SkeletonP />
				)}
			</Collapsible>
		</>
	);
};

export default Item;

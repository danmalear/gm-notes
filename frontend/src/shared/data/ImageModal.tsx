import { Center, Modal } from '@mantine/core';

export interface ImageModalProps {
	imagePath: string;
	opened: boolean;
	title?: string;
	onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
	imagePath,
	opened,
	title,
	onClose,
}) => {
	return (
		<Modal opened={opened} onClose={onClose} title={title} size="lg">
			<Center>
				<img
					src={imagePath}
					style={{
						maxHeight: 'var(--modal-size)',
						maxWidth: 'var(--modal-size)',
					}}
				/>
			</Center>
		</Modal>
	);
};

export default ImageModal;

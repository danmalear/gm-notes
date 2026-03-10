import type { MapCreate as Map } from '#dtos/map.ts';
import { Button, Modal, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import type { UUID } from 'crypto';

export interface CreateMapModalProps extends React.PropsWithChildren {
	campaignId: UUID;
	opened: boolean;
	onCreate: (map: Map) => Promise<void>;
	onClose: () => void;
}

const CreateMapModal: React.FC<CreateMapModalProps> = ({
	campaignId,
	opened,
	onCreate,
	onClose,
}) => {
	const map = useForm<Map>({
		mode: 'uncontrolled',
		initialValues: {
			name: '',
			campaignId,
			imagePath: '',
			width: 0,
			height: 0,
		},
		validate: {
			name: (name) => (!name ? 'Map Name is required' : null),
			campaignId: (campaignId) => (!campaignId ? 'Campaign is required' : null),
			imagePath: (imagePath) => (!imagePath ? 'Map Image is required' : null),
			width: (width) => (!width ? 'Map Width is required' : null),
			height: (height) => (!height ? 'Map Height is required' : null),
		},
	});

	const handleCreateClicked = (formMap: Map) => {
		onCreate(formMap).then(() => {
			onClose();
		});
	};

	return (
		<Modal opened={opened} onClose={onClose} title="New Map" centered>
			<form onSubmit={map.onSubmit(handleCreateClicked)}>
				<TextInput
					label="Map Name"
					withAsterisk
					key={map.key('name')}
					{...map.getInputProps('name')}
				/>
				<Button type="submit" mt="sm">
					Create
				</Button>
			</form>
		</Modal>
	);
};

export default CreateMapModal;

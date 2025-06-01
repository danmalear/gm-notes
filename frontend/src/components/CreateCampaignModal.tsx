import type { CampaignResponse as Campaign } from '#dtos/Campaign.ts';
import { Modal } from '@mantine/core';
import type React from 'react';

export interface CreateCampaignModalProps extends React.PropsWithChildren {
	opened: boolean;
	onCreate: (campaign: Campaign) => Promise<void>;
	onClose: () => void;
}

const CreateCampaignModal: React.FC<CreateCampaignModalProps> = ({
	opened,
	//onCreate,
	onClose,
}) => {
	return (
		<Modal
			opened={opened}
			onClose={onClose}
			title="Create New Campaign"
			centered
		>
			Placeholder text
		</Modal>
	);
};

export default CreateCampaignModal;

import { Skeleton } from '@mantine/core';
import type { FC } from 'react';

const SkeletonP: FC = () => {
	return (
		<>
			<Skeleton height="0.6rem" />
			<Skeleton height="0.6rem" mt="0.7rem" />
			<Skeleton height="0.6rem" mt="0.7rem" width="70%" />
		</>
	);
};

export default SkeletonP;

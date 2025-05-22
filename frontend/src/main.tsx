import { MantineProvider } from '@mantine/core';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import router from './routes.ts';

import '@mantine/core/styles.css';
import './index.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<MantineProvider defaultColorScheme="dark">
			<RouterProvider router={router} />
		</MantineProvider>
	</StrictMode>,
);

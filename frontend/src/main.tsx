import { createTheme, MantineProvider } from '@mantine/core';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import router from './routes.tsx';

import '@mantine/core/styles.css';
import './index.css';

const theme = createTheme({
	primaryColor: 'violet',
});

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<MantineProvider defaultColorScheme="dark" theme={theme}>
			<RouterProvider router={router} />
		</MantineProvider>
	</StrictMode>,
);

console.log('env vars:', JSON.stringify(import.meta.env));

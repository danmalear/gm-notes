import {
	EventListenerContext,
	type EventListeners,
} from '#shared/event-listeners/EventListenerContext.ts';
import { createTheme, MantineProvider } from '@mantine/core';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import router from './routes.tsx';

import { serverBaseUrl } from '#shared/api.ts';
import { isUUID } from '#shared/uuid.ts';
import { startWebsocket } from '#websocket/websocket.ts';
import '@mantine/core/styles.css';
import './index.css';

const theme = createTheme({
	primaryColor: 'violet',
});

const listeners: EventListeners = {};

function getValidEvent(event: unknown) {
	if (typeof event !== 'string') return;
	const chunks = event.split('/');
	if (chunks.length !== 5 || chunks[0] !== 'Event') return;
	const context = chunks[1];
	const ref = chunks[2];
	const streamId = chunks[3];
	const dataString = chunks[4];

	if (!isUUID(streamId)) return;

	let data: object;
	try {
		data = JSON.parse(dataString);
	} catch {
		return;
	}

	return {
		context,
		ref,
		streamId,
		data,
	};
}

function addEventListener(ws: WebSocket) {
	ws.addEventListener('message', (event) => {
		console.log('message received', JSON.stringify(event.data));
		const validEvent = getValidEvent(event.data);
		if (!validEvent) return;

		const { context, ref, streamId, data } = validEvent;

		if (!(context in listeners)) return;
		if (!(ref in listeners[context]!)) return;

		const refListeners = listeners[context]![ref]!;

		refListeners.all.forEach((listener) => {
			listener.handle(data);
		});

		if (refListeners[streamId]) {
			refListeners[streamId].forEach((listener) => {
				listener.handle(data);
			});
		}
	});
}

startWebsocket(`${serverBaseUrl}/ws`, addEventListener);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<EventListenerContext value={listeners}>
			<MantineProvider defaultColorScheme="dark" theme={theme}>
				<RouterProvider router={router} />
			</MantineProvider>
		</EventListenerContext>
	</StrictMode>,
);

console.log('env vars:', JSON.stringify(import.meta.env));

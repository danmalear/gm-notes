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
import type { Event } from '#shared/event-listeners/Event.ts';
import { isUUID } from '#shared/uuid.ts';
import { startWebsocket } from '#websocket/websocket.ts';
import '@mantine/core/styles.css';
import './index.css';

const theme = createTheme({
	primaryColor: 'violet',
});

const listeners: EventListeners = {};

function getValidEvent(eventString: unknown): Event | undefined {
	if (typeof eventString !== 'string') return;
	let event: unknown;
	try {
		event = JSON.parse(eventString);
	} catch {
		return;
	}

	if (!event || typeof event !== 'object') return;
	if (!('context' in event) || typeof event.context !== 'string') return;
	if (!('ref' in event) || typeof event.ref !== 'string') return;
	if (
		!('streamId' in event) ||
		typeof event.streamId !== 'string' ||
		!isUUID(event.streamId)
	)
		return;
	if (
		!('correlationId' in event) ||
		typeof event.correlationId !== 'string' ||
		!isUUID(event.correlationId)
	)
		return;
	if (!('streamVersion' in event) || typeof event.streamVersion !== 'number')
		return;
	if (!('data' in event) || !event.data || typeof event.data !== 'object')
		return;
	const { context, ref, streamId, correlationId, streamVersion, data } = event;

	return {
		context,
		ref,
		streamId,
		correlationId,
		streamVersion,
		data,
	};
}

function addEventListener(ws: WebSocket) {
	ws.addEventListener('message', (event) => {
		console.log('message received', JSON.stringify(event.data));
		const validEvent = getValidEvent(event.data);
		if (!validEvent) return;

		const { context, ref, streamId } = validEvent;

		if (!(context in listeners)) return;
		if (!(ref in listeners[context]!)) return;

		const refListeners = listeners[context]![ref]!;

		refListeners.all.forEach((listener) => {
			listener.handle(validEvent);
		});

		if (refListeners[streamId]) {
			refListeners[streamId].forEach((listener) => {
				listener.handle(validEvent);
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

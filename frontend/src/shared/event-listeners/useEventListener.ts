import { EventListenerContext } from '#shared/event-listeners/EventListenerContext.ts';
import type { UUID } from 'crypto';
import { useContext } from 'react';
import type { Event } from './Event';

export interface EventOpts {
	context: string;
	ref: string;
	streamId?: UUID;
}

export const useEventListener = (
	key: string,
	{ context, ref, streamId }: EventOpts,
	handler: (event: Event) => void,
) => {
	const allListeners = useContext(EventListenerContext);
	if (!allListeners[context]) {
		allListeners[context] = {};
	}
	const contextListeners = allListeners[context]!;
	if (!contextListeners[ref]) {
		contextListeners[ref] = {
			all: [],
		};
	}
	const refListeners = contextListeners[ref]!;

	const listenerId = streamId ?? 'all';

	if (refListeners[listenerId].find((listener) => listener.key === key)) return;
	refListeners[listenerId].push({ key, handle: handler });
};

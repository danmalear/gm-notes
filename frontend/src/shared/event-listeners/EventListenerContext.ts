import type { UUID } from 'crypto';
import { createContext } from 'react';
import type { Event } from './Event';

export type KeyedListener = {
	key: string;
	handle: (event: Event) => void;
};

export type RefListeners = {
	[KStream in UUID | 'all']: KeyedListener[];
};

export type ContextListeners = {
	[KRef in string]?: RefListeners;
};

export type EventListeners = {
	[KContext in string]?: ContextListeners;
};

export const EventListenerContext = createContext<EventListeners>(null!);

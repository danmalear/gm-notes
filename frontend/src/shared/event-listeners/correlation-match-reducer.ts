import type { UUID } from 'crypto';
import type { Event } from './Event.ts';

export interface CorrelationMatchState {
	isListeningForMatch: boolean;
	commandCorrelationId: UUID | undefined;
	eventsByCorrelationId: Record<UUID, Event>;
	matchedEvent?: Event;
}

interface ListenForMatchAction {
	type: 'listenForMatch';
}

interface MatchCommandAction {
	type: 'matchCommand';
	commandCorrelationId: UUID;
}

interface MatchEventAction {
	type: 'matchEvent';
	event: Event;
}

interface ClearMatchedEventAction {
	type: 'clearMatchedEvent';
}

export type CorrelationMatchAction =
	| ListenForMatchAction
	| MatchCommandAction
	| MatchEventAction
	| ClearMatchedEventAction;

type CorrelationMatchReducer = (
	eventListenerState: CorrelationMatchState,
	action: CorrelationMatchAction,
) => CorrelationMatchState;

const correlationMatchReducer: CorrelationMatchReducer = (state, action) => {
	switch (action.type) {
		case 'listenForMatch': {
			console.log('started listening for match');
			return {
				...state,
				isListeningForMatch: true,
			};
		}
		case 'matchCommand': {
			const { commandCorrelationId } = action;
			const { isListeningForMatch, eventsByCorrelationId } = state;
			console.log(
				'matching command. command correlation ID:',
				commandCorrelationId,
				'message IDs:',
				eventsByCorrelationId,
			);
			if (!isListeningForMatch) return state;
			for (const eventCorrelationId in eventsByCorrelationId) {
				if (eventCorrelationId === commandCorrelationId) {
					return {
						isListeningForMatch: false,
						commandCorrelationId: undefined,
						eventsByCorrelationId: {},
						matchedEvent: eventsByCorrelationId[eventCorrelationId],
					};
				}
			}
			return {
				...state,
				commandCorrelationId: commandCorrelationId,
				eventsByCorrelationId: {},
			};
		}
		case 'matchEvent': {
			const { event } = action;
			const {
				isListeningForMatch,
				commandCorrelationId,
				eventsByCorrelationId,
			} = state;
			console.log(
				'matching event. event correlation ID:',
				event.correlationId,
				'command ID:',
				commandCorrelationId,
			);
			if (!isListeningForMatch) return state;
			if (event.correlationId === commandCorrelationId) {
				return {
					isListeningForMatch: false,
					commandCorrelationId: undefined,
					eventsByCorrelationId: {},
					matchedEvent: eventsByCorrelationId[event.correlationId],
				};
			}
			return {
				...state,
				eventsByCorrelationId: {
					...eventsByCorrelationId,
					[event.correlationId]: event,
				},
			};
		}
		case 'clearMatchedEvent': {
			return {
				...state,
				matchedEvent: undefined,
			};
		}
		default: {
			throw Error(
				`Unhandled event listener action: ${(action as { type: string }).type}`,
			);
		}
	}
};

export default correlationMatchReducer;

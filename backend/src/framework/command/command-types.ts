// Should be overridden with specific implementation before use
export interface CommandRequestBase {
	domain: string;
	commandType: string;
	command: object;
}

export type CommandFunction<T extends object> = (command: T) => void;

export type RequestCommands<DomainRequest extends CommandRequestBase> = {
	[C in DomainRequest as C['commandType']]: (
		command: C['command'],
	) => Promise<object>;
};

export type DomainCommands<DomainRequest extends CommandRequestBase> =
	RequestCommands<DomainRequest> & {
		domain: DomainRequest['domain'];
	};

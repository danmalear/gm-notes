// Should be overridden with specific implementation before use
export interface CommandRequestBase {
	commandType: string;
	command: object;
}

export type CommandFunction<T extends object> = (command: T) => void;

export type CommandClass<CommandRequests extends CommandRequestBase> = {
	[C in CommandRequests as C['commandType']]: (
		command: C['command'],
	) => Promise<object>;
};

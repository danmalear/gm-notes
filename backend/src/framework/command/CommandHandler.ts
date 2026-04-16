import { CommandRequestBase, Commands } from './command-types.ts';

export class CommandHandler {
	commands: Record<
		string,
		Record<string, (command: object) => Promise<object>>
	>;

	constructor() {
		this.commands = {};
	}

	registerCommands<DomainRequest extends CommandRequestBase>(
		domain: string,
		commands: Commands<DomainRequest>,
	) {
		this.commands[domain] = commands;
	}
}

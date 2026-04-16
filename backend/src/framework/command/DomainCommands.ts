import type { CommandRequestBase, Commands } from './command-types.ts';
import type { CommandHandler } from './CommandHandler.ts';

export abstract class DomainCommands<
	Domain extends string,
	DomainRequest extends CommandRequestBase,
> {
	// implements Record<string, () => Promise<object>>
	domain: Domain;
	abstract commands: Commands<DomainRequest>;

	constructor(domain: Domain, commandHandler: CommandHandler) {
		this.domain = domain;
		this.register(commandHandler);
	}

	register(commandHandler: CommandHandler) {
		commandHandler.registerCommands(this.domain, this.commands);
	}
}

import type { CommandRequestBase, Commands } from './command-types.ts';
import type { CommandRouter } from './CommandRouter.ts';

export abstract class DomainCommands<
	Domain extends string,
	DomainRequest extends CommandRequestBase,
> {
	// implements Record<string, () => Promise<object>>
	domain: Domain;
	abstract commands: Commands<DomainRequest>;

	constructor(domain: Domain, commandHandler: CommandRouter) {
		this.domain = domain;
		this.register(commandHandler);
	}

	register(commandHandler: CommandRouter) {
		commandHandler.registerCommands(this.domain, this.commands);
	}
}

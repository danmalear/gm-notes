import type { ContractBase } from '#prisma';

type ValueSets<
	TEnum extends
		keyof ContractBase['storage']['namespaces']['public']['entries']['valueSet'],
> =
	ContractBase['storage']['namespaces']['public']['entries']['valueSet'][TEnum]['values'][number];

export type Skill = ValueSets<'Skill'>;

export type AbsoluteLighting = ValueSets<'AbsoluteLighting'>;

export type RelativeLighting = ValueSets<'RelativeLighting'>;

export type CurrencyUnit = ValueSets<'CurrencyUnit'>;

export type Value = `${number} ${CurrencyUnit}`;

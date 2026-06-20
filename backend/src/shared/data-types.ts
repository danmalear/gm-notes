import type { CurrencyUnit } from '#prisma-enums';

export type Lighting = 'Darkness' | 'Dim Light' | 'Bright Light';
export type RelativeLighting = Lighting | 'Default' | 'Default+' | 'Default-';

export type Value = `${number} ${CurrencyUnit}`;

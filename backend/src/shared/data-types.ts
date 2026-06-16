export type Lighting = 'Darkness' | 'Dim Light' | 'Bright Light';
export type RelativeLighting = Lighting | 'Default' | 'Default+' | 'Default-';

export type CurrencyUnit = 'CP' | 'SP' | 'EP' | 'GP' | 'PP';
export type Value = `${number} ${CurrencyUnit}`;

export interface TransakFiatCurrency {
  id: number;
  symbol: string;
  name: string;
  restrictions: null | {
    'minAmount': string,
    'maxAmount': string
  };
}

export const testTransakFiatCurrencies: TransakFiatCurrency[] = [ //TODO::: delete
  {
    id: 1,
    symbol: 'A',
    name: 'AAA',
    restrictions: null
  },
  {
    id: 2,
    symbol: 'B',
    name: 'BBB',
    restrictions: null
  },
  {
    id: 3,
    symbol: 'C',
    name: 'CCC',
    restrictions: null
  }
];

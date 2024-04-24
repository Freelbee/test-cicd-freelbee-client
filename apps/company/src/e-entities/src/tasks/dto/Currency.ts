export interface Currency {
  id: number,
  paymentProviderName: PaymentProviderName,
  type: CurrencyType,
  code: string,

  externalCurrencyId?: number,
  blockchainNetwork?: string,
  isPopular?: boolean,
  name?: string,
  iconUrl?: string,
  minAmount?: string, //TODO::: or number, not supported on frontend yet
  maxAmount?: string, //TODO::: or number, not supported on frontend yet
}

export enum PaymentProviderName {
  NEBEUS = 'NEBEUS',
  TRANSAK = 'TRANSAK',
}

export enum CurrencyType {
  FIAT = 'FIAT',
  CRYPTO = 'CRYPTO',
}

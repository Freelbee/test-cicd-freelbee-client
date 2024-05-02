import { CurrencyType } from "./CurrencyType";
import { PaymentProviderName } from "./PaymentProviderName";

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
  minAmount?: string,
  maxAmount?: string,
}

import { CurrencyType } from "./CurrencyType";
import { PaymentProviderName } from "./PaymentProviderName";

export interface CurrencyDto {
    id: number,
    paymentProviderName: PaymentProviderName,
    type: CurrencyType,
    code: string,

    // OPTIONAL FIELDS:
    externalCurrencyId?: number,
    blockchainNetwork?: string,
    //TRANSAK's flag for most popular currencies
    isPopular?: boolean,
    // Euro, Bitcoin, etc.
    name?: string,
    iconUrl?: string,
    minAmount?: number,
    maxAmount?: number
}
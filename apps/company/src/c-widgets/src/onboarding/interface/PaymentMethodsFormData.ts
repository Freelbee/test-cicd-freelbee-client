import { PaymentMethodPropType, PaymentMethodType } from "@freelbee/entities";

export type PaymentMethodFormData = Record<PaymentMethodPropType, string>;

export interface PaymentMethodData {
    type: PaymentMethodType,
    data: PaymentMethodFormData
}
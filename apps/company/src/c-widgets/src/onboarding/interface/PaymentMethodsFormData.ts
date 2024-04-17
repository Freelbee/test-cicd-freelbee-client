import { PaymentMethodPropType, PaymentMethodType } from "@freelbee/entities";

export type PaymentMethodFormData =  Partial<{[K in PaymentMethodPropType]: string}>;

export interface PaymentMethodData {
    type: PaymentMethodType,
    data: PaymentMethodFormData
}
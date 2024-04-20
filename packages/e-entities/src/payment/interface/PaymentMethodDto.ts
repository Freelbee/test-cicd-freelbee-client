import { PaymentMethodPropType } from "./PaymentMethodPropType"
import { PaymentMethodType } from "./PaymentMethodType"

export interface PaymentMethodDto {
    counterpartyId: number,
    type: PaymentMethodType,
    props: Array<{
       type: PaymentMethodPropType,
       value: string
    }>
}
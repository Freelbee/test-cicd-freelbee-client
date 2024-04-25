import { PaymentMethodPropType } from "./PaymentMethodPropType"
import { PaymentMethodType } from "./PaymentMethodType"

export interface PaymentMethod {
  id: number,
  counterpartyId: number,
  type: PaymentMethodType,
  isActive: boolean,
  usedAt: string,
  createdAt: string,
  endedAt: string,
  props: Record<PaymentMethodPropType, string>,
}

export interface CreatePaymentMethodDto {
  counterpartyId: number,
  type: PaymentMethodType,
  props: PaymentMethodProps
}

export type PaymentMethodProps = Array<{
  type: PaymentMethodPropType,
  value: string
}>

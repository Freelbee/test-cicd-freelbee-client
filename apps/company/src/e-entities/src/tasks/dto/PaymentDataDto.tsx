import { Currency, PaymentMethod, PaymentMethodResponse, PaymentProviderName } from '@freelbee/entities';
import { PaymentDto } from './PaymentDto';

export interface PaymentDataResponseDto {
  id: number,
  status: PaymentDataStatus,
  taskId: number,
  paymentProviderName: PaymentProviderName,
  payments: PaymentDto[],

  payerCounterpartyId: number,
  payerPaymentMethod: PaymentMethod,
  payerAmount: string,
  payerAmountPaid: string,
  payerCurrency: Currency,

  receiverCounterpartyId: number,
  receiverPaymentMethod: PaymentMethod,
  receiverAmount: string,
  receiverCurrency: Currency,

  createdAt: string,
  updatedAt: string,
  endedAt: string,
}

export interface PaymentDataResponseDtoModified {
  id: number,
  status: PaymentDataStatus,
  taskId: number,
  paymentProviderName: PaymentProviderName,
  payments: PaymentDto[],

  payerCounterpartyId: number,
  payerPaymentMethod: PaymentMethodResponse,
  payerAmount: string,
  payerAmountPaid: string,
  payerCurrency: Currency,

  receiverCounterpartyId: number,
  receiverPaymentMethod: PaymentMethodResponse,
  receiverAmount: string,
  receiverCurrency: Currency,

  createdAt: string,
  updatedAt: string,
  endedAt: string,
}

export enum PaymentDataStatus {
  NOT_PAID = 'NOT_PAID',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  FULLY_PAID = 'FULLY_PAID',
}

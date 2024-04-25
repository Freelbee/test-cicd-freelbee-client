import { Currency, PaymentMethod, PaymentProviderName } from '@freelbee/entities';

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

  createdAt: string, //TODO::: or number
  updatedAt: string, //TODO::: or number
  endedAt: string, //TODO::: or number
}

export enum PaymentDataStatus {
  NOT_PAID = 'NOT_PAID',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  FULLY_PAID = 'FULLY_PAID',
}

export interface PaymentDto {
  id: number,
  status: PaymentStatus,
  providerTransactionId: string,
  amount: string,
  currency: Currency,
  createdAt: string,
  updatedAt: string,
  endedAt: string,
}

export enum PaymentStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  ERROR = 'ERROR',
  PAID = 'PAID',
}

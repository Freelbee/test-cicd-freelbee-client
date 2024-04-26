import { Currency } from '@freelbee/entities';

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

export interface PaymentResponseDto {
  id: number,
  status: PaymentStatus,
  providerTransactionId: string,
  amount: string,
  currency: Currency,
  createdAt: string,
  updatedAt: string,
  endedAt: string
}

export enum PaymentStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  ERROR = 'ERROR',
  PAID = 'PAID',
}

import { Currency } from '@freelbee/entities';
import { PaymentStatus } from './PaymentDataResponseDto';

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

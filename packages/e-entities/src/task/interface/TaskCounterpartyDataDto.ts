import { TaskStatus } from './TaskStatus';
import { FileData } from '@freelbee/shared/ui-kit';
import { PaymentProviderName } from '../../payment/interface/PaymentProviderName';

export interface TaskCounterpartyDataDto {
  id: number,
  taskId: number,
  title: string,
  status: TaskStatus,
  createdAt: string,
  deadlineAt: string,
  finishedAt: string | null,
  payedAt: string | null,
  description: string,
  customerId: number,
  executorId: number,
  workTypeId: number | null,
  price: number | null,
  executorEmail: string,
  customerCurrency: string,
  executorCurrency: string,
  signature: string,
  contractId: number | null,
  paymentProviderName: PaymentProviderName,
  files: FileData[],
  customContractFile: FileData,
}

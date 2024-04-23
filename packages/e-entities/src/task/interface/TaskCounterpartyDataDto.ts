import { TaskStatus } from "./TaskStatus";
import { FileT } from '../../../../../apps/company/src/c-widgets/src/task/TaskCreation/interface/FileT';

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
    customerEmail: string,
    executorEmail: string,
    workTypeId: number | null,
    price: number | null,
    customerCurrency: string,
    executorCurrency: string,
    signature: string,
    files: FileT[],
}

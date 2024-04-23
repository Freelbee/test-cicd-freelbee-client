import { WorksCategory, WorksType } from './WorksCategory';
import { TaskFreelancerData } from './CreateGroupRequest';
import { TransakFiatCurrency } from './TransakFiatCurrency';
import { Task } from './Task';
import { FileData } from '@freelbee/shared/ui-kit';

export type TaskCreationBuilder =
  Omit<Task,
    'id' |
    'createdAt' |
    'updatedAt' |
    'freelancerTaskInfo' |
    'status' |
    'attachedFiles' |
    'customContractFile' |
    'currency' |
    'companyTaskInfo' |
    'worksTypeId' |
    'companyCurrency' |
    'companyEmail' |
    'companyName' |
    'freelancerEmail' |
    'fiatCurrencyId' |
    'freelancerStatus'
  >
  & {
  attachedFiles: FileData[],
  paymentMethod: PaymentMethod, //todo::: change
  contractFiles?: FileData[],
  fiatCurrencyId: number,
  worksType?: WorksType,
  worksCategory?: WorksCategory,
  freelancers?: Array<TaskFreelancerData>,
  fiatCurrency?: TransakFiatCurrency
};

export type TaskRequestDto =
  Omit<Task,
    'id' |
    'createdAt' |
    'updatedAt' |
    'freelancerTaskInfo' |
    'status' |
    'attachedFiles' |
    'customContractFile' |
    'currency' |
    'companyTaskInfo' |
    'companyCurrency' |
    'companyEmail' |
    'companyName' |
    'freelancerStatus'
  >
  & {
  attachedFiles: FileData[],
  customContractFile?: FileData,
  fiatCurrencyId: number
};

export enum PaymentMethod {
  NEBEUS = 'NEBEUS',
  TRANSAK = 'TRANSAK',
}

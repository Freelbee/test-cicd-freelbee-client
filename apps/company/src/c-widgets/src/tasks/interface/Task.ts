import { FreelancerTaskInfo } from './FreelancerTaskInfo';
import { FileT } from './FileT';
import { FreelancerStatus } from './FreelancerModel';

export interface Task {
  name: string;

  worksTypeId: number;
  description: string;
  attachedFiles: FileT[];
  deadline: string;

  id: number;
  status: TaskStatus;
  price: string;
  companyCurrency: string;
  signature: string;
  createdAt: string;
  updatedAt: string;
  freelancerEmail: string;
  freelancerTaskInfo: FreelancerTaskInfo;
  companyName: string;
  companyEmail: string;
  companyId: number;
  attributeValues: Array<AttributeValueDto>,
  customContractFile: FileT;
  freelancerStatus: FreelancerStatus | null
}

export enum TaskStatus {
  DRAFT = 'DRAFT',
  NEW = 'NEW',
  ASSIGNED = 'ASSIGNED',
  CANCELLED = 'CANCELLED',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEWING = 'REVIEWING',
  WAITING_FOR_PAYMENT = 'WAITING_FOR_PAYMENT',
  PAYMENT_IN_PROGRESS = 'PAYMENT_IN_PROGRESS',
  PAYMENT_ERROR = 'PAYMENT_ERROR',
  PAID = 'PAID',
}

export interface AttributeValueDto {
  name: string,
  attributeId: number,
  attributeType: string,
}

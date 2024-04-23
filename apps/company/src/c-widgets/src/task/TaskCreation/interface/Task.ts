import { FreelancerTaskInfo } from './FreelancerTaskInfo';
import { FileT } from './FileT';
import { FreelancerStatus } from './FreelancerModel';
import { TaskStatus } from '@freelbee/entities';

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

export interface AttributeValueDto {
  name: string,
  attributeId: number,
  attributeType: string,
}

'use client';

import { createContext, Dispatch, SetStateAction } from 'react';
import moment from 'moment/moment';
import { FileData } from '@freelbee/shared/ui-kit';
import DateUtil from 'packages/f-shared/src/utils/date/DateUtil';
import { TaskFreelancerData } from '../interface/TaskFreelancerData';
import { WorksCategory, WorksType } from '@company/entities';
import { Currency, PaymentProviderName } from '@freelbee/entities';

export enum TaskCreation_Step {
  GENERAL_INFO = 'general_info',
  PAYMENT_INFO = 'payment_info',
  CONTRACT_INFO = 'contract_info',
}

export type TaskCreationData = {
  name: string;
  worksCategory?: WorksCategory,
  worksType?: WorksType;
  description: string;
  deadline: string;
  freelancers?: TaskFreelancerData[];
  paymentProviderName: PaymentProviderName,
  price: string;
  currency?: Currency;
  signature: string;
};

export const taskCreationDataInit: TaskCreationData = {
  name: '',
  description: '',
  freelancers: [],
  price: '',
  signature: '',
  deadline: moment().add(1, 'd').format(DateUtil.EUROPEAN_DATE_FORMAT),
  paymentProviderName: PaymentProviderName.NEBEUS,
};

export interface ITaskCreationContext {
  taskCreationData: TaskCreationData,
  setTaskCreationData: Dispatch<SetStateAction<TaskCreationData>>,

  step: TaskCreation_Step;
  setStep: (step: TaskCreation_Step) => void;

  attachedFiles: FileData[];
  setAttachedFiles: Dispatch<SetStateAction<FileData[]>>,

  customContractFiles: FileData[];
  setCustomContractFiles: Dispatch<SetStateAction<FileData[]>>,

  createOneTask: () => Promise<void>,
  clearTaskCreator: () => void
}

export const TaskCreationContext = createContext<ITaskCreationContext>({
  taskCreationData: taskCreationDataInit,
  setTaskCreationData: () => ({}),

  step: TaskCreation_Step.GENERAL_INFO,
  setStep: () => {},

  attachedFiles: [],
  setAttachedFiles: () => ({}),

  customContractFiles: [],
  setCustomContractFiles: () => ({}),

  createOneTask: () => Promise.resolve(),
  clearTaskCreator: () => ({}),
});

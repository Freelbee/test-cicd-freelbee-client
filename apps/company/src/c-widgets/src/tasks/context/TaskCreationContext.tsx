'use client';

import { createContext, Dispatch, SetStateAction } from 'react';
import { TaskInGroupRequest } from '../interface/CreateGroupRequest';
import { PaymentMethod, TaskCreationBuilder } from '../interface/TaskRequestDto';
import moment from 'moment/moment';
import { FileData } from '@freelbee/shared/ui-kit';
import DateUtil from 'packages/f-shared/src/utils/date/DateUtil';

export enum TaskCreation_Step {
  GENERAL_INFO = 'general_info',
  PAYMENT_INFO = 'payment_info',
  CONTRACT_INFO = 'contract_info',
}

export const taskRequestDtoInit: TaskCreationBuilder = {
  name: '',
  description: '',
  freelancers: [],
  price: '',
  fiatCurrencyId: 0,
  signature: '',
  deadline: moment().add(1, 'd').format(DateUtil.EUROPEAN_DATE_FORMAT),
  companyId: -1,
  attributeValues: [],
  attachedFiles: [],
  paymentMethod: PaymentMethod.NEBEUS,
};

export interface ITaskCreationContext {
  isModalOpened: boolean;
  setModalOpened: (v: boolean) => void;

  taskCreationBuilder: TaskCreationBuilder,
  setTaskCreationBuilder: Dispatch<SetStateAction<TaskCreationBuilder>>,

  step: TaskCreation_Step;
  setStep: (step: TaskCreation_Step) => void;

  tasks: TaskInGroupRequest[];
  setTasks: (tasks: TaskInGroupRequest[]) => void;

  attachedFiles: FileData[];
  setAttachedFiles: Dispatch<SetStateAction<FileData[]>>,

  contractFiles: FileData[];
  setContractFiles: Dispatch<SetStateAction<FileData[]>>,

  // createOneTask: () => Promise<Task>,
  clearTaskCreator: () => void
}

export const TaskCreationContext = createContext<ITaskCreationContext>({
  isModalOpened: false,
  setModalOpened: () => {},

  taskCreationBuilder: taskRequestDtoInit,
  setTaskCreationBuilder: () => ({}),

  step: TaskCreation_Step.GENERAL_INFO,
  setStep: () => {},

  tasks: [],
  setTasks: () => ({}),

  attachedFiles: [],
  setAttachedFiles: () => ({}),

  contractFiles: [],
  setContractFiles: () => ({}),

  // createOneTask: () => Promise.resolve({} as Task),
  clearTaskCreator: () => ({}),
});

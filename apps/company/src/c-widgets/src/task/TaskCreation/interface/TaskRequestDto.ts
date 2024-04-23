import { WorksCategory, WorksType } from './WorksCategory';
import { TaskFreelancerData } from './CreateGroupRequest';
import { TransakFiatCurrency } from './TransakFiatCurrency';

export type TaskCreationBuilder = {
  name: string;
  worksCategory?: WorksCategory,
  worksType?: WorksType;
  description: string;
  deadline: string;
  freelancers?: TaskFreelancerData[];
  paymentMethod: PaymentMethod,
  price: string;
  fiatCurrency?: TransakFiatCurrency;
  signature: string;
};

export enum PaymentMethod {
  NEBEUS = 'NEBEUS',
  TRANSAK = 'TRANSAK',
}

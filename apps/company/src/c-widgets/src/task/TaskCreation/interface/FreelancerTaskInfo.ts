import { Freelancer } from './Freelancer';

export interface FreelancerTaskInfo {
    freelancer: Freelancer;
    userDetail: UserDetail;
}

export type UserDetail = {
  email: string
};

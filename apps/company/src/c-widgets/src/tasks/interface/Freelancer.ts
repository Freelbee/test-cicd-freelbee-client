import { FreelancerRole } from './TaskGeneralInfoFormData';

export interface Freelancer {
  id: number
  firstName: string
  lastName: string
  email: string
  createdAt: string,
  type?: FreelancerRole
}

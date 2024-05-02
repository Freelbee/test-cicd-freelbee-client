export type TaskFreelancerData = {
  counterpartyId: number,
  email: string,
  firstName: string,
  lastName: string,
  status: UserDataStatus,
};

export enum UserDataStatus {
  IN_REVIEW = 'IN_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

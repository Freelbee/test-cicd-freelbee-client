export type TaskFreelancerData = {
  id: number,
  email: string,
  firstName: string,
  lastName: string,
  role: FreelancerRole,
  systemStatus: SystemStatus,
  freelancerStatus: FreelancerStatus,
};

export enum FreelancerRole {
  DEFAULT = 'default',
  INDIVIDUAL_ENTREPRENEUR = 'individual_entrepreneur',
  SELF_EMPLOYED = 'self_employed',
  SELF_INDIVIDUAL = 'self_individual',
  PERSONAL = 'personal',
}

export enum SystemStatus {
  REGISTERED = 'registered',
  INVITED = 'invited',
  SENT = 'sent',
  NEW = 'new',
  UNKNOWN = 'unknown'
}

export enum FreelancerStatus {
  WAIT_FOR_APPROVAL = 'wait_for_approval',
  APPROVED = 'approved',
  DISABLED = 'disabled',
  FAILED = 'failed',
}

export const tempTaskFreelancerData: TaskFreelancerData[] = [ //TODO::: delete after the endpoint is added
  {
    id: 111,
    email: "test111@mail.ru",
    firstName: "First1",
    lastName: "Last1",
    role: FreelancerRole.DEFAULT,
    systemStatus: SystemStatus.REGISTERED,
    freelancerStatus: FreelancerStatus.APPROVED,
  },
  {
    id: 112,
    email: "test112@mail.ru",
    firstName: "First2",
    lastName: "Last2",
    role: FreelancerRole.PERSONAL,
    systemStatus: SystemStatus.INVITED,
    freelancerStatus: FreelancerStatus.APPROVED
  },
  {
    id: 113,
    email: "test113@mail.ru",
    firstName: "First3",
    lastName: "Last3",
    role: FreelancerRole.INDIVIDUAL_ENTREPRENEUR,
    systemStatus: SystemStatus.NEW,
    freelancerStatus: FreelancerStatus.APPROVED
  },
];

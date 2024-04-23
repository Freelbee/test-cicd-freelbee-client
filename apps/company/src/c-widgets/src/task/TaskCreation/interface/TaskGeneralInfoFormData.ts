export type TaskFreelancerData = {
  firstName: string,
  lastName: string,
  role: FreelancerRole,
  systemStatus: SystemStatus,
  email: string,
  price: number,
  currency: Currency,
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

export enum Currency {
  EUR = 'eur',
  UAH = 'uah',
  USD = 'usd',
  USDT = 'usdt',
  RUB = 'rub',
  UZS = 'uzs',
}

export const tempTaskFreelancerData: TaskFreelancerData[] = [ //TODO::: delete
  {
    firstName: "First1",
    lastName: "Last1",
    role: FreelancerRole.DEFAULT,
    systemStatus: SystemStatus.REGISTERED,
    email: "001_email",
    price: 1,
    currency: Currency.EUR
  },
  {
    firstName: "First2",
    lastName: "Last2",
    role: FreelancerRole.PERSONAL,
    systemStatus: SystemStatus.INVITED,
    email: "002_email",
    price: 2,
    currency: Currency.UZS
  },
  {
    firstName: "First3",
    lastName: "Last3",
    role: FreelancerRole.INDIVIDUAL_ENTREPRENEUR,
    systemStatus: SystemStatus.NEW,
    email: "003_email",
    price: 3,
    currency: Currency.USDT
  },
];

export enum Endpoint_Enum {
  REFRESH_TOKEN = '/auth/refresh',
  ZOHO_CREATE_LEAD = `/zoho/lead`,
  FREELANCER_COMPANIES = ``,
  FREELANCER = `/counterparties/freelancer`,
  USER = '/users',

  FREELANCER_ONBOARDING_STATUS = `/counterparty-onboarding/freelancer/onboarding/state`,
  SET_USER_DATA = `/users/user-data`,
  CREATE_FREELANCER = `/users/counterparty/freelancer`,

  GET_FREELANCER_TASKS_PAGE = '/freelancer/search/{0}/tasks',
  ACCEPT_TASK = '/task/{0}/accept',
  SET_STATUS = '/saas-task/{0}/set-status',
  GET_CONTRACT_LINK = '/contract/{0}/download-link',
  GET_TASK_FILES = '/task/{0}/files',

  GET_CURRENCIES = '/currencies'
}

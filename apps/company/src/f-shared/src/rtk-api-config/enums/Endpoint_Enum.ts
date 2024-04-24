export enum Endpoint_Enum {
  REFRESH_TOKEN = '/auth/company/refresh',
  ZOHO_CREATE_LEAD = `/zoho/lead`,
  COMPANY_FREELANCERS = ``,
  USER = '/users',
  COMPANY_ONBOARDING_STATUS = `/users/company/onboarding/state`,
  SET_USER_DATA = `/users/user-data`,
  CREATE_COMPANY = `/counterparties/company`,
  COMPANY = `/counterparties/company`,
  CREATE_PAYMENT_METHODS = '/payment-methods',

  SEARCH_TASKS = '/search/{0}/tasks',
  ADD_TASK = '/company/tasks',
  GET_CONTRACT_LINK = '/contract/{0}/download-link',
  GET_WORKS_CATEGORIES = '/categories',
  GET_CURRENCIES = '/currencies',
  GET_TASK_FILES = '/task/{0}/files',
  SET_STATUS = '/saas-task/{0}/set-status',
}

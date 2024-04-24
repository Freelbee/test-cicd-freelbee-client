export enum Endpoint_Enum {
  REFRESH_TOKEN = '/auth/refresh',
  ZOHO_CREATE_LEAD = `/zoho/lead`,
  COMPANY_FREELANCERS = ``,
  USER = '/users',
  COMPANY_ONBOARDING_STATUS = `/users/company/onboarding/state`,
  SET_USER_DATA = `/users/user-data`,
  CREATE_COMPANY = `/counterparties/company`,
  COMPANY = `/counterparties/company`,
  CREATE_PAYMENT_METHODS = '/payment-methods',

  GET_COMPANY_TASKS_PAGE = '/search/{0}/tasks',
  FIND_FREELANCERS = '/freelancers',
  GET_WORKS_CATEGORIES = '/categories',
  GET_CURRENCIES = '/currencies',
  ADD_TASK = '/company/tasks',
  GENERATE_AND_DOWNLOAD_CONTRACT_PREVIEW = '/contract-preview',
  GET_CONTRACT_LINK = '/contract/{0}/download-link',
  GET_TASK_FILES = '/task/{0}/files',
  SET_STATUS = '/task/{0}/set-status',
}

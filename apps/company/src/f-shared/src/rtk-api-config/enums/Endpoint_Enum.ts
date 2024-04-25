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

  GET_COMPANY_TASKS_PAGE = '/search/{0}/tasks',
  FIND_FREELANCERS = '/freelancers',
  GET_WORKS_CATEGORIES = '/categories',
  GET_CURRENCIES = '/currencies',
  ADD_TASK = '/company/tasks',
  GENERATE_AND_DOWNLOAD_CONTRACT_PREVIEW = '/contract-preview',
  GET_CONTRACT_LINK = '/contract/{0}/download-link',
  GET_TASK_FILES = '/task/{0}/files',
  SET_STATUS = '/task/{0}/set-status',
  FREELANCER_INVITATION = '/invitations/from-company/to-freelancer',

  //sign-up
  COMPANY_SIGNUP = '/registration/company',
  COMPANY_REG_SESSION = '/registration/company/session',
  COMPANY_REG_CONFIRM = '/registration/company/email/confirm/{0}',
  COMPANY_REG_RESEND_SESSION = '/registration/company/email/resend',

  //sign-in
  COMPANY_SIGNIN = '/auth/company',
  COMPANY_AUTH_SESSION = '/auth/company/session',
  COMPANY_AUTH_CONFIRM = '/auth/company/confirm/{0}',
  COMPANY_AUTH_RESEND_SESSION = '/auth/company/email/resend',
  AUTH__COMPANY__IS_AUTHENTICATED = '/auth/company/is-authenticated',
  AUTH__COMPANY__LOGOUT = '/auth/company/logout'
}

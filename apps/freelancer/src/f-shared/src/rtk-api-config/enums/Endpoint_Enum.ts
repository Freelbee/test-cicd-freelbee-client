export enum Endpoint_Enum {
  REFRESH_TOKEN = '/auth/freelancer/refresh',
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

  GET_CURRENCIES = '/currencies',

  //sign-up
  FREELANCER_SIGNUP = '/registration/freelancer',
  FREELANCER_REG_SESSION = '/registration/freelancer/session',
  FREELANCER_REG_CONFIRM = '/registration/freelancer/email/confirm/{0}',
  FREELANCER_REG_RESEND_SESSION = '/registration/freelancer/email/resend',

  //sign-in
  FREELANCER_SIGNIN = '/auth/freelancer',
  FREELANCER_AUTH_SESSION = '/auth/freelancer/session',
  FREELANCER_AUTH_CONFIRM = '/auth/freelancer/confirm/{0}',
  FREELANCER_AUTH_RESEND_SESSION = '/auth/freelancer/email/resend',
  AUTH__FREELANCER__IS_AUTHENTICATED = '/auth/freelancer/is-authenticated',
  AUTH__FREELANCER__LOGOUT = '/auth/freelancer/logout',
}

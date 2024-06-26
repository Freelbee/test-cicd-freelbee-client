export enum Endpoint_Enum {
  REFRESH_TOKEN = '/auth/company/refresh',
  ZOHO_CREATE_LEAD = `/zoho/lead`,
  COMPANY_FREELANCERS = ``,
  USER = '/users',
  COMPANY_ONBOARDING_STATUS = `/users/company/onboarding/state`,
  SET_USER_DATA = `/users/user-data`,
  CREATE_COMPANY = `/counterparties/company`,
  COMPANY_DOCUMENTS = '/counterparties/company-documents',
  COMPANY = `/counterparties/company`,
  CREATE_PAYMENT_METHODS = '/payment-methods',
  GET_PAYMENT_METHODS = '/payment-methods/{0}',

  GET_COMPANY_TASKS_PAGE = '/search/{0}/tasks',
  FIND_FREELANCERS = '/freelancers',
  GET_WORKS_CATEGORIES = '/categories',
  GET_CURRENCIES = '/currencies',
  ADD_TASK = '/company/tasks',
  GENERATE_AND_DOWNLOAD_CONTRACT_PREVIEW = '/contract-preview',
  GET_CONTRACT_LINK = '/contract/{0}/download-link',
  GET_INVOICE_LINK = '/contract/{0}/invoice/COMMERCIAL/download-link',
  GET_TASK_FILES = '/task/{0}/files',
  SET_STATUS = '/task/{0}/set-status',
  FREELANCER_INVITATION = '/invitations/from-company/to-freelancer',

  GET_PAYMENT_DATA = '/tasks/{0}/payment-data',
  CREATE_PAYMENT_DATA = '/payment-data/{0}/payment',
  WEBHOOK_TRANSAK_EVENT = '/webhook/transak/event-from-widget',

  SEND_NOTIFICATION_ABOUT_NEW_COMPANY_FOR_APPROVAL = `/notifications/new-company-for-approval/{0}`,

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
  AUTH__COMPANY__LOGOUT = '/auth/company/logout',

  UPDATE_PASSWORD = 'security/user/password'
}

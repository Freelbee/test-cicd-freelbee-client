export enum Endpoint_Enum { //TODO::: rename to comply with backend
  REFRESH_TOKEN = '/auth/refresh-token-pair',

  SESSION_DATA = `auth/info`,
  ADMIN_USER = `admin`,
  LOGIN = `auth/credentials`,
  SEND_CONFIRMATION = `auth/send-confirmation`,
  CONNECT_TELEGRAM = `auth/telegram-user`,
  LOGOUT = `auth/logout`,
  REFRESH_TOKEN_PAIR = `auth/refresh-token-pair`,

  CONFIRMATION_CODES = `confirmation-codes/search`,

  GET_PAGE_OF_COMPANY_COUNTERPARTIES = 'companies',
  GET_COMPANY_COUNTERPARTY = 'companies/{0}',
  SET_COMPANY_COUNTERPARTY_STATUS = 'companies/{0}/set-status',
}

export const ApiMethodsWithoutToken = [
  Endpoint_Enum.SESSION_DATA,
  Endpoint_Enum.LOGIN,
  Endpoint_Enum.LOGOUT,
  Endpoint_Enum.CONNECT_TELEGRAM,
  Endpoint_Enum.SEND_CONFIRMATION,
  Endpoint_Enum.REFRESH_TOKEN_PAIR
];

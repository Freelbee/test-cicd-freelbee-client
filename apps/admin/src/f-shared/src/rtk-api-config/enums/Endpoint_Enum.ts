export enum Endpoint_Enum { //TODO::: rename to comply with backend
  REFRESH_TOKEN = '/auth/refresh-token-pair',

  SESSION_DATA = 'auth/info',
  GET_ADMIN = 'admin',
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  CREATE_ADMIN_USER = 'admin',
  SIGN_IN = 'auth/credentials',
  SEND_CONFIRMATION = 'auth/send-confirmation',
  CONNECT_TELEGRAM = 'auth/telegram-user',
  LOGOUT = 'auth/logout',
  REFRESH_TOKEN_PAIR = 'auth/refresh-token-pair',

  GET_ALL_CONFIRMATION_CODES = 'confirmation-codes',

  GET_PAGE_OF_COMPANY_COUNTERPARTIES = 'companies',
  GET_COMPANY_COUNTERPARTY = 'companies/{0}',
  SET_COMPANY_COUNTERPARTY_STATUS = 'companies/{0}/set-status',
}

export const ApiMethodsWithoutToken = [
  Endpoint_Enum.SESSION_DATA,
  Endpoint_Enum.SIGN_IN,
  Endpoint_Enum.LOGOUT,
  Endpoint_Enum.CONNECT_TELEGRAM,
  Endpoint_Enum.SEND_CONFIRMATION,
  Endpoint_Enum.REFRESH_TOKEN_PAIR
];

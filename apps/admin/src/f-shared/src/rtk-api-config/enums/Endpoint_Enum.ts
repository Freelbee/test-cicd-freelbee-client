export enum Endpoint_Enum {

  /**
   * @see telegramUserApi
   */
  CREATE_TELEGRAM_USER = 'auth/telegram-user',

  /**
   * @see adminAuthApi
   */
  SIGN_IN = 'auth/credentials',
  SEND_CONFIRMATION = 'auth/send-confirmation',
  GET_AUTH_INFO = 'auth/info',
  REFRESH_TOKEN_PAIR = '/auth/refresh-token-pair',
  LOGOUT = 'auth/logout',

  /**
   * @see adminUserApi
   */
  GET_ADMIN_ROLES = `roles`,
  CREATE_ADMIN_USER = 'admin',
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  GET_ADMIN_USER = 'admin',

  /**
   * @see companyApi
   */
  GET_COMPANY_COUNTERPARTY = 'companies/{0}',
  GET_PAGE_OF_COMPANY_COUNTERPARTIES = 'companies?page={0}&size={1}',
  SET_COMPANY_COUNTERPARTY_STATUS = 'companies/{0}/set-status',

  /**
   * @see confirmationCodeApi
   */
  GET_ALL_CONFIRMATION_CODES = 'confirmation-codes',
}

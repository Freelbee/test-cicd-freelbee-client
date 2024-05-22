export interface ConfirmationCode {
  id: string;
  type: ConfirmationCodeType;
  value: string;
  expirationInSeconds: number;
}

export enum ConfirmationCodeType {
  EMAIL_REGISTRATION_CONFIRMATION = 'EMAIL_REGISTRATION_CONFIRMATION',
  EMAIL_AUTHENTICATION_CONFIRMATION = 'EMAIL_AUTHENTICATION_CONFIRMATION',
}

export interface RuleMessage {
    en: string;
}

export type ValidationError = {
    field: string | null,
    text: RuleMessage,
    failType: string | null
};

export type ValidationErrors = Array<ValidationError>;

export enum ErrorType {
    VALIDATION = 'validation',
    TECH = 'tech',
    CLIENT = 'client',
    UNKNOWN = 'unknown'
}

export type ErrorsResponse = {
    date: string,
    messages: ValidationErrors,
    status: string,
    type: ErrorType
};

export type ErrorResponse = {
    date: string,
    message: RuleMessage,
    status: string
};
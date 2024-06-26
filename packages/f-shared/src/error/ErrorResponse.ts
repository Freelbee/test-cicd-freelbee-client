import { MessageWithLanguages } from "../language/interface/MessageWithLanguages";
import { ErrorType } from "./ErrorType";
import { ValidationErrors } from "./ValidationError";

export type ErrorsResponse = {
    date: string,
    messages: ValidationErrors,
    status: string,
    type: ErrorType
};

export type ErrorResponse = {
    date: string,
    message: MessageWithLanguages,
    status: string
};

export interface NewError {
    status: number,
    error: string,
    message: string,
    techMessage: string,
    timestamp: string
} 
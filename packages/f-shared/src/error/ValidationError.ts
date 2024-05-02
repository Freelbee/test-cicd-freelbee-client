import { MessageWithLanguages } from "../language/interface/MessageWithLanguages";

export type ValidationError = {
    field: string | null,
    text: MessageWithLanguages,
    failType: string | null
};

export type ValidationErrors = Array<ValidationError>;

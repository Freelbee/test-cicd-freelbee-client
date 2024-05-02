import { MessageWithLanguages } from "../language/interface/MessageWithLanguages";

export interface PopupError {
    id: number,
    title: MessageWithLanguages,
    description: MessageWithLanguages
};
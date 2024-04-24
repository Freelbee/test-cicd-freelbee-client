import { UserRole } from "../../user/interface/UserRole";
import { FileLink } from "./FileLink";

export interface TaskFileDto {
    id: number;
    userRole: UserRole;
    canRemove: boolean;
    fileLink: FileLink;
    creatorEmail: string;
    fileName: string;
    createdAt: string;

    action?: FileAction;
}

export enum FileAction {
    NO_ACTION,
    DELETE,
    DOWNLOAD
}

export type ActionFiles = {
    action?: FileAction
};

export interface NewFile {
    id: number,
    name: string,
    payload: string
}

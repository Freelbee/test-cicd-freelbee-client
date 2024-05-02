import { UserDataPropsType } from "@freelbee/entities";

export type FormData = Partial<{[K in UserDataPropsType]: string}>;
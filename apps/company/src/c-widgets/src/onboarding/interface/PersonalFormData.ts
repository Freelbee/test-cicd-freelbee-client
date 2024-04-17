import { UserDataPropsType } from "@freelbee/entities"

export type PersonalFormData =  Partial<{[K in UserDataPropsType]: string}>;
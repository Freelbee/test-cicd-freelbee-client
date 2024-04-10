import { UserDataPropsType } from "./UserDataPropType"
import { UserDataType } from "./UserDataType"

export interface UserDataDto {
    type: UserDataType,
    props: Array<{
       key: UserDataPropsType,
       value: string
    }>
}
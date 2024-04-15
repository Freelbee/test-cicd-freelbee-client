import { UserDataPropsType } from "./UserDataPropType"
import { UserDataType } from "./UserDataType"

export interface UserDataDto {
    type: UserDataType,
    props: Array<{
       type: UserDataPropsType,
       value: string
    }>
}
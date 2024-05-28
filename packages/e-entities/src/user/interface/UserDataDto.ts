import { UserDataPropsType } from "./UserDataPropType"
import { UserDataType } from "./UserDataType"
import { UserStatus } from './UserStatus';

export interface UserDataDto {
  id?: number,
  status?: UserStatus,
  type: UserDataType,
  props: Array<{ type: UserDataPropsType; value: string }>
}

export interface UserDataDtoModified extends Omit<UserDataDto, 'props'> {
  props: Record<UserDataPropsType, string>
}

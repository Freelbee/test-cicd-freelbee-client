import { UserDataPropsType } from "./UserDataPropType"
import { UserDataType } from "./UserDataType"
import { UserStatus } from './UserStatus';
import { DetailProps } from '@freelbee/shared';

export interface UserDataDto {
  id: number,
  status: UserStatus | null,
  type: UserDataType,
  props: DetailProps<UserDataPropsType>
}

export interface UserDataDtoModified extends Omit<UserDataDto, 'props'> {
  props: Record<UserDataPropsType, string>
}

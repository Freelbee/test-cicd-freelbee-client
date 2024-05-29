import { UserDataDto, UserDataDtoModified } from '@freelbee/entities';

export interface UserDto {
  id: number,
  email: string,
  phone: string,
  userData: UserDataDto,
}

export interface UserDtoModified extends Omit<UserDto, 'userData'> {
  userData: UserDataDtoModified;
}

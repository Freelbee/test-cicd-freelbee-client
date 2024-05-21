import {
  CounterpartyDetailsPropsType,
  CounterpartyDetailsType,
  CounterpartyStatus,
  UserDataPropsType, UserStatus
} from '@freelbee/entities';
import { DetailProps } from '@freelbee/shared';
import { UserType } from '../../../../../../../packages/e-entities/src/user/interface/UserType';

export interface CounterpartyDto {
  id: number,
  user: UserDto;
  counterpartyDetail: {
    status: CounterpartyStatus,
    id: number,
    iban: string,
    country: string,
    type: CounterpartyDetailsType,
    props: DetailProps<CounterpartyDetailsPropsType>
  }
}

export interface CounterpartyDtoModified {
  id: number,
  user: UserDtoModified;
  counterpartyDetail: {
    status: CounterpartyStatus,
    id: number,
    iban: string,
    country: string,
    type: CounterpartyDetailsType,
    props: Record<CounterpartyDetailsPropsType, string>
  }
}

export interface UserDto {
  id: number,
  email: string,
  phone: string,
  userData: UserDataDto,
}

export interface UserDtoModified {
  id: number,
  email: string,
  phone: string,
  userData: UserDataDtoModified,
}

export interface UserDataDto {
  id: number,
  status: UserStatus | null,
  type: UserType,
  props: DetailProps<UserDataPropsType>
}

export interface UserDataDtoModified {
  id: number,
  status: UserStatus | null,
  type: UserType,
  props: Record<UserDataPropsType, string>
}

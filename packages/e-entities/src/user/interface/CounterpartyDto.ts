import { CounterpartyDetailDto, CounterpartyDetailDtoModified, UserDto, UserDtoModified } from '@freelbee/entities';

export interface CounterpartyDto {
  id: number;
  user: UserDto;
  counterpartyDetail: CounterpartyDetailDto;
}

export interface CounterpartyDtoModified extends Omit<CounterpartyDto, 'user' | 'counterpartyDetail'> {
  user: UserDtoModified;
  counterpartyDetail: CounterpartyDetailDtoModified;
}

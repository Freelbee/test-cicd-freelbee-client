import { CounterpartyDetailsPropsType, CounterpartyDetailsStatus, CounterpartyDetailsType } from '@freelbee/entities';
import { DetailProps } from '@freelbee/shared';

export interface CounterpartyDetailDto {
  id: number,
  country: string,
  status: CounterpartyDetailsStatus,
  type: CounterpartyDetailsType,
  props: DetailProps<CounterpartyDetailsPropsType>
}

export interface CounterpartyDetailDtoModified extends Omit<CounterpartyDetailDto, 'props'> {
  props: Record<CounterpartyDetailsPropsType, string>
}

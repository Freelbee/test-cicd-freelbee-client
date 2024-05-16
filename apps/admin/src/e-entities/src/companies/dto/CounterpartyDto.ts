import { CounterpartyDetailsPropsType, CounterpartyDetailsType, CounterpartyStatus } from '@freelbee/entities';
import { DetailProps } from '@freelbee/shared';

export interface CounterpartyDto {
  id: number,
  counterpartyDetail: {
    status: CounterpartyStatus,
    id: number,
    iban: string,
    country: string,
    type: CounterpartyDetailsType,
    props: DetailProps<CounterpartyDetailsPropsType>
  }
}

export interface CompanyData {
  id: number,
  counterpartyDetail: {
    status: CounterpartyStatus,
    id: number,
    iban: string,
    country: string,
    type: CounterpartyDetailsType,
    props: Record<CounterpartyDetailsPropsType, string>
  }
}

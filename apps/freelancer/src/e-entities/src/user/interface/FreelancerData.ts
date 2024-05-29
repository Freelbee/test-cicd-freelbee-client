import { CounterpartyDetailsPropsType, CounterpartyDetailsType, CounterpartyDetailsStatus } from '@freelbee/entities';
import { DetailProps } from '@freelbee/shared';

export interface FreelancerResponse {
  status: CounterpartyDetailsStatus,
  id: number,
  counterpartyDetail: {
    id: number,
    iban: string,
    country: string,
    type: CounterpartyDetailsType,
    props: DetailProps<CounterpartyDetailsPropsType>
  }
}

export interface FreelancerData {
  status: CounterpartyDetailsStatus,
  id: number,
  counterpartyDetail: {
    id: number,
    iban: string,
    country: string,
    type: CounterpartyDetailsType,
    props: Record<CounterpartyDetailsPropsType, string>
  }
}

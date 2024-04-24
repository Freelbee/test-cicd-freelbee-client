import { CounterpartyDetailsPropsType, CounterpartyDetailsType, CounterpartyStatus } from "@freelbee/entities";
import { DetailProps } from "@freelbee/shared";

export interface CompanyResponse {
    status: CounterpartyStatus,
    id: number,
    counterpartyDetail: {
        id: number,
        iban: string,
        country: string,
        type: CounterpartyDetailsType,
        props: DetailProps<CounterpartyDetailsPropsType>
    }
}

export interface CompanyData {
    status: CounterpartyStatus,
    id: number,
    counterpartyDetail: {
        id: number,
        iban: string,
        country: string,
        type: CounterpartyDetailsType,
        props: Record<CounterpartyDetailsPropsType, string>
    }
}

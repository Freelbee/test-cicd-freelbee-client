import { CounterpartyDetailsPropsType, CounterpartyDetailsType, CounterpartyDetailsStatus } from "@freelbee/entities";
import { DetailProps } from "@freelbee/shared";

export interface CompanyResponse {
    id: number,
    counterpartyDetail: {
        status: CounterpartyDetailsStatus,
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
        status: CounterpartyDetailsStatus,
        id: number,
        iban: string,
        country: string,
        type: CounterpartyDetailsType,

        props: Record<CounterpartyDetailsPropsType, string>
    }
}

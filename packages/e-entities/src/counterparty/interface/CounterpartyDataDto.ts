import { CounterpartyDetailsPropsType } from "./CounterpartyDetailsPropsType"
import { CounterpartyDetailsType } from "./CounterpartyDetailsType"

export interface CounterpartyDataDto {
    country: string,
    type: CounterpartyDetailsType       
    props: {
        type: CounterpartyDetailsPropsType
        value: string
    }[]
}
// To-Do

import { Country } from "@freelbee/entities";

export interface FormData {
    street: string,
    houseNumber: string,
    country: Country | null,
    city: string,
    postalCode: string,
    name: string,
    surname: string,
    phone: string,
    dateOfBirth: string
}
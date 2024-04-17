'use client'

import { API } from "@company/shared";
import { Country } from "@freelbee/entities";

export const countriesAPI = API.injectEndpoints({
    endpoints: (builder) => ({
        getCountries: builder.query<Array<Country>, void>({
            query: () => ({
                url: 'https://restcountries.com/v2/all?fields=name,flags,alpha2Code',
                method: 'GET'
            }), 
            extraOptions: {
                notAuthorized: true,
            }
        }
        )
    })
});

export const {
    useGetCountriesQuery
} = countriesAPI;
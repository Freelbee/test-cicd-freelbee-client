'use client';

import {SelectWithSearch, Text} from "@freelbee/shared/ui-kit";
import styled from "styled-components";
import countries from "i18n-iso-countries";
import { useMemo} from "react";

// eslint-disable-next-line @typescript-eslint/no-var-requires
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

interface Props {
    value: string;
    onSelect: (c: string) => void;
    isError?: boolean;
}

export const CountrySelect = ({onSelect, isError, value}: Props) => {

    const countriesList = useMemo(() => Object.values(countries.getNames("en", {select: "official"})), []);

    const renderCountry = (country: string) => {
        return <CountryItem>
                    {/* <Image src={country.flags.svg} alt="country flag" width={18} height={14} /> */}
                    <Text font='body'>{country}</Text>
                </CountryItem>
    }

  return (
    <SelectWithSearch<string> 
           placeholder="Country"
           searchPlaceholder="Search by country name"
          items={countriesList}
          isRequired
          label="Select a country"
          value={value}
          getStringValue={c => c}
          setValue={(c) => {
            onSelect(c);
          }}
          renderOption={renderCountry}
          isError={isError} />
  )
}

const CountryItem = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0 8px;
`
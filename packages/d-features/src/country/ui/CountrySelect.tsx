'use client';

import { Country } from "@freelbee/entities";
import {SelectWithSearch, Text} from "@freelbee/shared/ui-kit";
import Image from "next/image";
import styled from "styled-components";

interface Props {
    countries: Array<Country>;
    selectedCountry: Country | null;
    onSelect: (c: Country) => void;
    isError?: boolean;
}

export const CountrySelect = ({countries, selectedCountry, onSelect, isError}: Props) => {

    const renderCountry = (country: Country) => {
        return <CountryItem>
                    <Image src={country.flags.svg} alt="country flag" width={18} height={14} />
                    <Text font='body'>{country.name}</Text>
                </CountryItem>
    }

  return (
    <SelectWithSearch<Country> 
           placeholder="Country"
           searchPlaceholder="Search by country name"
          items={countries}
          isRequired
          label="Select a country"
          value={selectedCountry}
          getStringValue={c => c.name}
          setValue={onSelect}
          renderOption={renderCountry}
          isError={isError} />
  )
}

const CountryItem = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0 16px;
`
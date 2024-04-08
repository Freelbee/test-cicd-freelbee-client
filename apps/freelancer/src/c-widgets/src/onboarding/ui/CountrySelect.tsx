'use client';

import SelectWithInput from "packages/d-features/src/common/select/SelectWithInput/SelectWithInput";

export interface Country {
    name: string;
    alpha2Code: string,
}

export interface Props {
    countries: Array<Country>;
    selectedCountry: Country;
    onSelect: (c: Country) => void;
}

export const CountrySelect = ({countries, selectedCountry, onSelect}: Props) => {

    const renderCountry = (country: Country) => {
        return <div>{country.name}</div>
    }

  return (
    <SelectWithInput<Country> 
        items={countries}
        isRequired
        label="Select a country"
        value={selectedCountry}
        getStringValue={c => c.name}
        setValue={onSelect} 
        listRender={renderCountry} 
        forInput={""} />
  )
}

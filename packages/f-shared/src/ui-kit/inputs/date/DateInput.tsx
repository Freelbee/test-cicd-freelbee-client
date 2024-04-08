'use client';

import { Color } from "@freelbee/shared/ui-kit";
import { Input } from "../input/input";
import { ReactNode } from "react";

interface Props {
    value: string,
    isError?: boolean,
    isValid?: boolean,
    isRequired?: boolean,
    errorMessage?: ReactNode,
    tipsText?: ReactNode,
    label?: string,
    noMessageSpace?: boolean,
    setValue: (value: string) => void;
    tipsColor?: Color;
}

export const DateInput = ({setValue, ...rest}: Props) => {

    const handleChange = (value: string) => {
        let rightFormat = (value as string)
        .replace(/[^0-9.]/, '')
        .replace(/\.{2,}/g, '.')
        .replace(/^([0-9]{2})\.[4-9]/, '$1.')
        .replace(/^([0-9]{2})\.(3)[2-9]/, '$1.$2')
        .replace(/^[^10]/, '')
        .replace(/^([0-9]{2})\.([0-9]{2})\./g, '$1.$2')
        .replace(/^([0-9]{2})([0-9]{1,2})/g, '$1.$2')
        .replace(/^([0-9]{2})\.([0-9]{2})([0-9]{1,4})/g, '$1.$2.$3')
        .replace(/^([0-9]{2})\.([0-9]{2})\.([0-9]{4})[0-9]+/, '$1.$2.$3');

        if(rightFormat.length < 3) {
            const m = parseInt(rightFormat);
            rightFormat = m > 12 ? rightFormat.substring(0,1) : rightFormat;
        }
        if(rightFormat.length > 8) {
            const m = parseInt(rightFormat.substring(0, 3));
            const d = parseInt(rightFormat.substring(3, 6));
            const year = parseInt(rightFormat.substring(7, 12));
            const countDayInMonth = new Date(year, m, 0).getDate();
            rightFormat = d > countDayInMonth ? rightFormat.substring(0, 9) : rightFormat;
        }

        setValue(rightFormat);
    }

  return (
    <Input
    {...rest}
    placeholder={'mm.dd.yyyy'}
    setValue={handleChange}
    />
  )
}

'use client';

import { ReactNode, useId } from 'react';
import PhoneInput from 'react-phone-number-input';
import styled from 'styled-components';

import { CountryCode } from 'libphonenumber-js';

import {Label} from "../self-utils/label";

import {typography, Color} from '@freelbee/shared/ui-kit'

import 'react-phone-number-input/style.css';
import { AnimatePresence } from 'framer-motion';
import { ErrorOutput } from '../self-utils/errorOutput';

interface Props {
    label?: string;
    value: string;
    setValue: (value: string) => void;
    defaultCountry?: CountryCode;
    isError?: boolean,
    isValid?: boolean,
    isRequired?: boolean,
    errorMessage?: ReactNode,
}

export const PhoneNumberInput = ({value, setValue, defaultCountry = 'US', isRequired, label, isError, isValid, errorMessage, ...rest}: Props) => {

    const id = useId();

    return (<Container $isError={isError} $isValid={isValid}>
        {label && <Label forInput={id} isRequired={isRequired} label={label}/>}
        <PhoneInput
            id={id}
            defaultCountry={defaultCountry}
            placeholder="Enter phone number"
            value={value}
            onChange={setValue}
            {...rest}
        />
            <AnimatePresence>
                {isError && errorMessage &&
                <ErrorOutput message={errorMessage} />}
            </AnimatePresence>    
    </Container>);
};

const Container = styled.div<{$isError?: boolean, $isValid?: boolean}>`
    display: grid;
    row-gap: 8px;

    .PhoneInput {
        position: relative;
    }

    .PhoneInputCountry {
        position: absolute;
        height: 100%;
        width: 70px;
        z-index: 2;
        left: 16px;
    }

    .PhoneInputInput {
        ${typography.body};
        color: ${Color.GRAY_800};
        height: 48px;
        width: 100%;
        border-radius: 10px;
        border: 1px solid ${({$isError, $isValid}) => $isError ? Color.DANGER
        : $isValid ? Color.EMERALD : Color.GRAY_400};
        transition: 0.3s border;
        padding-left: 64px;

        &::placeholder {
            color: ${Color.GRAY_500};
        }

        &:hover {
            border: 1px solid ${({$isError, $isValid}) => $isError ? Color.DANGER
        : $isValid ? Color.EMERALD : Color.GRAY_600};
        }

        &:focus {
            outline: none;
            border: 1px solid ${({$isError, $isValid}) => $isError ? Color.DANGER
        : $isValid ? Color.EMERALD : Color.BLUE};
        }

        &:disabled {
            border: 1px solid ${Color.GRAY_400};
        }
    }
`;

'use client';

import { InputHTMLAttributes, ReactNode, useId, useState} from 'react';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';

import { ReactComponent as EyeClosed } from '@freelbee/assets/icons/password-eye/eye_closed.svg';
import { ReactComponent as EyeOpened } from '@freelbee/assets/icons/password-eye/eye_opened.svg';

import {ErrorOutput} from "../self-utils/errorOutput";
import {Label} from "../self-utils/label";
import { baseInputStyles } from '@freelbee/shared/ui-kit';
import {Color} from '@freelbee/shared/ui-kit';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    value: string;
    responseError?: string;
    isError?: boolean,
    isValid?: boolean,
    isRequired?: boolean,
    errorMessage?: ReactNode,
    label?: string;
    setValue: (value: string) => void;
    noMessageSpace?: boolean;
};

export function PasswordInput (props: Props) {

    const {
        value,
        responseError,
        isError,
        isValid,
        isRequired,
        errorMessage,
        label,
        placeholder,
        setValue,
        noMessageSpace,
        ...rest
    } = props;

    const [showPassword, setShowPassword] = useState(false);

    const id = useId();

    return (
        <InputWrapper>
            <InputContainer $isDisabled={!!rest.disabled}>
                {label && <Label forInput={id} isRequired={isRequired} label={label}/>}

                <InputRow>
                    <Input
                        type={showPassword ? 'type' : 'password'}
                        $isError={isError || !!responseError}
                        $isValid={isValid}
                        value={value ?? ''}
                        placeholder={placeholder ?? '••••••••'}
                        onChange={(e)=> {
                            const value = e.target.value;
                            const regex = new RegExp(/^[\u0020-\u007E\u2116]+$/);
                            if (regex.test(value) || value === '') {
                                setValue(e.target.value);
                            }
                        }}
                        {...rest}
                        id={id}
                    />
                    <EyeButton
                        type='button'
                        $isHide={showPassword}
                        onClick={() => {
                            setShowPassword((prevState) => !prevState);
                        }}
                    >
                        <EyeIcon $isHide={showPassword}>
                            <EyeOpened/>
                            <EyeClosed/>
                        </EyeIcon>
                    </EyeButton>
                </InputRow>
            </InputContainer>

            <AnimatePresence>
                {isError && errorMessage &&
                <ErrorOutput message={errorMessage} absolutePosition={noMessageSpace} />}
            </AnimatePresence>
            <AnimatePresence>
                {!isError && responseError &&
                <ErrorOutput message={responseError} absolutePosition={noMessageSpace} />}
            </AnimatePresence>
        </InputWrapper>

    );
}

const InputWrapper = styled.div`
  position: relative;
  height: min-content;
`;

const InputRow = styled.div`
  height: 48px;
  position: relative;
`;

const InputContainer = styled.div<{$isDisabled: boolean}>`
  pointer-events: ${({$isDisabled}) => $isDisabled ? 'none' : 'all'};
  opacity: ${({$isDisabled}) => $isDisabled ? 0.8 : 1};
  display: grid;
  row-gap: 8px;
`;

const Input = styled.input<{$isError?: boolean, $isValid?: boolean}>`
  ${baseInputStyles};
  padding-left: 15px;
  padding-right: 45px;
`;

const EyeButton = styled.button<{$isHide: boolean}>`
  cursor: pointer;
  position: absolute;
  height: 48px;
  width: 20px;
  right: 17px;

  svg {
    width: 18px;
    height: 100%;
    stroke: ${Color.GRAY_600};
  }
`;

const EyeIcon = styled.span<{$isHide: boolean}>`
  svg {
    position: absolute;
    inset: 0;
    width: 18px;
    height: 100%;
    stroke: ${Color.GRAY_600};
    transition: opacity 0.3s;

    &:first-child {
        opacity: ${({$isHide}) => $isHide ? 1 : 0};
    }

    &:last-child {
        opacity: ${({$isHide}) => $isHide ? 0 : 1};
    }
  }
`;
